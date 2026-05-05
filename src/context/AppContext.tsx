import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Service, Application, User, Testimonial, FAQ, SiteSettings } from '../types';
import { statusMap, initialServices, initialTestimonials, initialFAQs, initialSettings } from '../data/initialData';
import {
  seedFirestore, fetchAllServices, fetchAllApplications, fetchApplicationsByUser,
  fetchApplicationByTracking, fetchAllTestimonials, fetchAllFAQs, fetchSettings,
  fetchAllUsers, fetchUserProfile, firebaseLogin, firebaseRegister, firebaseLogout,
  firebaseGoogleLogin, setupAuthListener, firebaseUpdatePassword as fbUpdatePassword,
  addServiceToDb, updateServiceInDb, deleteServiceFromDb,
  addApplicationToDb, updateApplicationInDb, deleteApplicationFromDb,
  addTestimonialToDb, updateTestimonialInDb, deleteTestimonialFromDb,
  addFAQToDb, updateFAQInDb, deleteFAQFromDb,
  updateSettingsInDb, updateUserInDb
} from '../firebase';

interface ToastItem { id: string; message: string; type: 'success' | 'error' | 'info' }

interface AppContextType {
  loading: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (id: string, data: Partial<User>) => void;
  updatePassword: (id: string, oldPass: string, newPass: string) => Promise<boolean>;
  services: Service[];
  getService: (id: string) => Service | undefined;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  applications: Application[];
  getUserApplications: (userId: string) => Application[];
  getApplication: (id: string) => Application | undefined;
  getApplicationByTracking: (tracking: string) => Promise<Application | undefined>;
  createApplication: (app: Omit<Application, 'id' | 'trackingNumber' | 'status' | 'statusName' | 'notes' | 'createdAt' | 'updatedAt'>) => Application;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  addApplicationNote: (appId: string, text: string) => void;
  deleteApplication: (id: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  faqs: FAQ[];
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => void;
  users: User[];
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
const generateTracking = () => 'EV-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

/** Deep-merge partial Firestore settings with full defaults */
function mergeSettings(partial: Record<string, any> | null | undefined): SiteSettings {
  const base = { ...initialSettings };
  if (!partial) return base;
  return {
    phone: partial.phone ?? base.phone,
    email: partial.email ?? base.email,
    address: partial.address ?? base.address,
    whatsapp: partial.whatsapp ?? base.whatsapp,
    workingHours: partial.workingHours ?? base.workingHours,
    socialMedia: { ...base.socialMedia, ...(partial.socialMedia || {}) },
    companyInfo: { ...base.companyInfo, ...(partial.companyInfo || {}) },
    stats: { ...base.stats, ...(partial.stats || {}) },
    team: Array.isArray(partial.team) && partial.team.length > 0 ? partial.team : base.team,
    whyUs: Array.isArray(partial.whyUs) && partial.whyUs.length > 0 ? partial.whyUs : base.whyUs,
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [applications, setApplications] = useState<Application[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const initialized = useRef(false);

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = useCallback((id: string) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  /* ───── Background data load (never blocks render) ───── */
  const loadPublicData = useCallback(async () => {
    try {
      const [svcs, tsts, fl, stt] = await Promise.all([
        fetchAllServices(), fetchAllTestimonials(), fetchAllFAQs(), fetchSettings()
      ]);
      if (svcs.length > 0) setServices(svcs);
      if (tsts.length > 0) setTestimonials(tsts);
      if (fl.length > 0) setFaqs(fl);
      setSettings(mergeSettings(stt));
    } catch {}
  }, []);

  const loadAllData = useCallback(async (userId?: string, userRole?: string) => {
    try {
      const [svcs, tsts, fl, stt, allUsers] = await Promise.all([
        fetchAllServices(), fetchAllTestimonials(), fetchAllFAQs(), fetchSettings(), fetchAllUsers()
      ]);
      if (svcs.length > 0) setServices(svcs);
      if (tsts.length > 0) setTestimonials(tsts);
      if (fl.length > 0) setFaqs(fl);
      setSettings(mergeSettings(stt));
      if (allUsers.length > 0) setUsers(allUsers);
      if (userId && userRole === 'admin') setApplications(await fetchAllApplications());
      else if (userId) setApplications(await fetchApplicationsByUser(userId));
    } catch {}
  }, []);

  /* ───── Init ───── */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let mounted = true;
    let unsub: (() => void) | null = null;

    (async () => {
      seedFirestore().catch(() => {});
      loadPublicData();

      try {
        unsub = setupAuthListener(async (fbUser: any) => {
          if (!mounted) return;
          try {
            if (fbUser) {
              const profile = await fetchUserProfile(fbUser.uid);
              const user = profile ?? {
                id: fbUser.uid,
                name: fbUser.displayName || fbUser.email?.split('@')[0] || '',
                email: fbUser.email || '', password: '', phone: '', role: 'user' as const,
                createdAt: new Date().toISOString()
              };
              setCurrentUser(user);
              await loadAllData(user.id, user.role);
            } else {
              setCurrentUser(null);
              setApplications([]);
            }
          } catch {}
        });
      } catch {}
    })();

    return () => { mounted = false; unsub?.(); };
  }, [loadPublicData, loadAllData]);

  /* ───── Auth ───── */
  const login = useCallback(async (email: string, pw: string) => {
    try {
      const p = await firebaseLogin(email, pw);
      if (p) { setCurrentUser(p); await loadAllData(p.id, p.role); return true; }
      return false;
    } catch { return false; }
  }, [loadAllData]);

  const googleLogin = useCallback(async () => {
    try {
      const p = await firebaseGoogleLogin();
      setCurrentUser(p); await loadAllData(p.id, p.role); return true;
    } catch { return false; }
  }, [loadAllData]);

  const register = useCallback(async (name: string, email: string, pw: string, phone: string) => {
    try {
      const p = await firebaseRegister(name, email, pw, phone);
      setCurrentUser(p); setUsers(prev => [...prev, p]);
      await loadAllData(p.id, p.role); return true;
    } catch { return false; }
  }, [loadAllData]);

  const logout = useCallback(() => { firebaseLogout().catch(() => {}); setCurrentUser(null); setApplications([]); }, []);

  const updateUser = useCallback((id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    setCurrentUser(prev => prev && prev.id === id ? { ...prev, ...data } : prev);
    updateUserInDb(id, data).catch(() => {});
  }, []);

  const updatePassword = useCallback(async (_id: string, oldP: string, newP: string) => {
    try { return await fbUpdatePassword(oldP, newP); } catch { return false; }
  }, []);

  /* ───── Services ───── */
  const getService = useCallback((id: string) => services.find(s => s.id === id), [services]);
  const addService = useCallback((s: Service) => { setServices(p => [...p, s]); addServiceToDb(s).catch(() => {}); }, []);
  const updateService = useCallback((id: string, d: Partial<Service>) => { setServices(p => p.map(s => s.id === id ? { ...s, ...d } : s)); updateServiceInDb(id, d).catch(() => {}); }, []);
  const deleteService = useCallback((id: string) => { setServices(p => p.filter(s => s.id !== id)); deleteServiceFromDb(id).catch(() => {}); }, []);

  /* ───── Applications ───── */
  const getUserApplications = useCallback((uid: string) => applications.filter(a => a.userId === uid), [applications]);
  const getApplication = useCallback((id: string) => applications.find(a => a.id === id), [applications]);
  const getApplicationByTracking = useCallback(async (tn: string) => {
    const local = applications.find(a => a.trackingNumber === tn.toUpperCase());
    if (local) return local;
    return (await fetchApplicationByTracking(tn)) ?? undefined;
  }, [applications]);

  const createApplication = useCallback((data: Omit<Application, 'id' | 'trackingNumber' | 'status' | 'statusName' | 'notes' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const app: Application = {
      ...data, id: generateId(), trackingNumber: generateTracking(),
      status: 'pending', statusName: statusMap['pending'],
      notes: [{ date: now, text: 'Başvuru alındı ve sisteme kaydedildi.', by: 'system' }],
      createdAt: now, updatedAt: now
    };
    setApplications(p => [...p, app]);
    addApplicationToDb(app).catch(() => {});
    return app;
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: Application['status']) => {
    const now = new Date().toISOString();
    setApplications(p => p.map(a => a.id === id ? {
      ...a, status, statusName: statusMap[status], updatedAt: now,
      notes: [...a.notes, { date: now, text: `Durum güncellendi: ${statusMap[status]}`, by: 'admin' }]
    } : a));
    const app = applications.find(a => a.id === id);
    if (app) updateApplicationInDb(id, {
      status, statusName: statusMap[status], updatedAt: now,
      notes: [...app.notes, { date: now, text: `Durum güncellendi: ${statusMap[status]}`, by: 'admin' }]
    }).catch(() => {});
  }, [applications]);

  const addApplicationNote = useCallback((appId: string, text: string) => {
    const now = new Date().toISOString();
    setApplications(p => p.map(a => a.id === appId ? { ...a, updatedAt: now, notes: [...a.notes, { date: now, text, by: 'admin' }] } : a));
    const app = applications.find(a => a.id === appId);
    if (app) updateApplicationInDb(appId, { updatedAt: now, notes: [...app.notes, { date: now, text, by: 'admin' }] }).catch(() => {});
  }, [applications]);

  const deleteApplication = useCallback((id: string) => { setApplications(p => p.filter(a => a.id !== id)); deleteApplicationFromDb(id).catch(() => {}); }, []);

  /* ───── Testimonials ───── */
  const addTestimonial = useCallback((t: Testimonial) => { setTestimonials(p => [...p, t]); addTestimonialToDb(t).catch(() => {}); }, []);
  const updateTestimonial = useCallback((id: string, d: Partial<Testimonial>) => { setTestimonials(p => p.map(t => t.id === id ? { ...t, ...d } : t)); updateTestimonialInDb(id, d).catch(() => {}); }, []);
  const deleteTestimonial = useCallback((id: string) => { setTestimonials(p => p.filter(t => t.id !== id)); deleteTestimonialFromDb(id).catch(() => {}); }, []);

  /* ───── FAQs ───── */
  const addFAQ = useCallback((f: FAQ) => { setFaqs(p => [...p, f]); addFAQToDb(f).catch(() => {}); }, []);
  const updateFAQ = useCallback((id: string, d: Partial<FAQ>) => { setFaqs(p => p.map(f => f.id === id ? { ...f, ...d } : f)); updateFAQInDb(id, d).catch(() => {}); }, []);
  const deleteFAQ = useCallback((id: string) => { setFaqs(p => p.filter(f => f.id !== id)); deleteFAQFromDb(id).catch(() => {}); }, []);

  /* ───── Settings ───── */
  const updateSettings = useCallback((d: Partial<SiteSettings>) => {
    setSettings(p => ({ ...p, ...d }));
    updateSettingsInDb(d).catch(() => {});
  }, []);

  return (
    <AppContext.Provider value={{
      loading: false, currentUser, login, googleLogin, register, logout, updateUser, updatePassword,
      services, getService, addService, updateService, deleteService,
      applications, getUserApplications, getApplication, getApplicationByTracking,
      createApplication, updateApplicationStatus, addApplicationNote, deleteApplication,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      faqs, addFAQ, updateFAQ, deleteFAQ,
      settings, updateSettings, users, toasts, showToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};
