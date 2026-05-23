import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Application, ContactMessage, FAQ, PublicTracking, Service, SiteSettings, Testimonial, User } from '../types';
import { initialFAQs, initialServices, initialSettings, initialTestimonials, statusMap } from '../data/initialData';
import {
  addApplicationToDb,
  addContactMessageToDb,
  addFAQToDb,
  addServiceToDb,
  addTestimonialToDb,
  deleteApplicationFromDb,
  deleteContactMessageFromDb,
  deleteFAQFromDb,
  deleteServiceFromDb,
  deleteTestimonialFromDb,
  deleteTrackingFromDb,
  fetchAllApplications,
  fetchAllContactMessages,
  fetchAllFAQs,
  fetchAllServices,
  fetchAllTestimonials,
  fetchAllUsers,
  fetchApplicationsByUser,
  fetchPublicTrackingByTracking,
  fetchSettings,
  fetchUserProfile,
  firebaseGoogleLogin,
  firebaseLogin,
  firebaseLogout,
  firebaseRegister,
  firebaseUpdatePassword as fbUpdatePassword,
  seedFirestore,
  setupAuthListener,
  updateApplicationInDb,
  updateContactMessageInDb,
  updateFAQInDb,
  updateServiceInDb,
  updateSettingsInDb,
  updateTestimonialInDb,
  updateUserInDb,
  upsertTrackingInDb,
  upsertUserInDb,
} from '../firebase';
import { buildServiceSlug } from '../utils/slug';
import { isAdminEmail } from '../utils/site';
import { sanitizeEmail, sanitizePhone, sanitizeText, sanitizeTextarea } from '../utils/sanitize';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  loading: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<User | 'redirect' | null>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (id: string, data: Partial<User>) => void;
  updatePassword: (id: string, oldPass: string, newPass: string) => Promise<boolean>;
  services: Service[];
  getService: (key: string) => Service | undefined;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  applications: Application[];
  getUserApplications: (userId: string) => Application[];
  getApplication: (id: string) => Application | undefined;
  getApplicationByTracking: (tracking: string) => Promise<PublicTracking | undefined>;
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
  contactMessages: ContactMessage[];
  createContactMessage: (message: Omit<ContactMessage, 'id' | 'status' | 'adminNote' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateContactMessage: (id: string, data: Partial<ContactMessage>) => void;
  deleteContactMessage: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => void;
  users: User[];
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const generateId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const generateTracking = () => `EV-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const normalizeService = (service: Service): Service => ({
  ...service,
  slug: service.slug || buildServiceSlug(service.country, service.title, service.id),
});

const normalizeUser = (user: User): User => ({
  ...user,
  role: isAdminEmail(user.email) ? 'admin' : user.role,
});

const mergeSettings = (partial: Record<string, any> | null | undefined): SiteSettings => {
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
};

const toPublicTracking = (application: Application): PublicTracking => ({
  id: application.id,
  applicationId: application.id,
  userId: application.userId,
  trackingNumber: application.trackingNumber,
  serviceTitle: application.serviceTitle,
  country: application.country,
  status: application.status,
  statusName: application.statusName,
  notes: application.notes.map(note => ({ date: note.date, text: sanitizeText(note.text, 300), by: note.by })),
  createdAt: application.createdAt,
  updatedAt: application.updatedAt,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>(initialServices.map(normalizeService));
  const [applications, setApplications] = useState<Application[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const initialized = useRef(false);

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = `${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(item => item.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  }, []);

  const loadPublicData = useCallback(async () => {
    try {
      const [serviceList, testimonialList, faqList, siteSettings] = await Promise.all([
        fetchAllServices(),
        fetchAllTestimonials(),
        fetchAllFAQs(),
        fetchSettings(),
      ]);
      if (serviceList.length > 0) setServices(serviceList.map(normalizeService).sort((a, b) => a.order - b.order));
      if (testimonialList.length > 0) setTestimonials(testimonialList);
      if (faqList.length > 0) setFaqs(faqList);
      setSettings(mergeSettings(siteSettings));
    } catch {}
  }, []);

  const loadAllData = useCallback(async (userId?: string, userRole?: User['role']) => {
    try {
      const [serviceList, testimonialList, faqList, siteSettings, allUsers, allContactMessages] = await Promise.all([
        fetchAllServices(),
        fetchAllTestimonials(),
        fetchAllFAQs(),
        fetchSettings(),
        userRole === 'admin' ? fetchAllUsers() : Promise.resolve([]),
        userRole === 'admin' ? fetchAllContactMessages() : Promise.resolve([]),
      ]);

      if (serviceList.length > 0) setServices(serviceList.map(normalizeService).sort((a, b) => a.order - b.order));
      if (testimonialList.length > 0) setTestimonials(testimonialList);
      if (faqList.length > 0) setFaqs(faqList);
      setSettings(mergeSettings(siteSettings));
      if (allUsers.length > 0) setUsers(allUsers.map(normalizeUser));
      if (allContactMessages.length > 0) setContactMessages(allContactMessages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      else if (userRole !== 'admin') setContactMessages([]);

      if (userId && userRole === 'admin') setApplications(await fetchAllApplications());
      else if (userId) setApplications(await fetchApplicationsByUser(userId));
      else setApplications([]);
    } catch {}
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let mounted = true;
    let unsubscribe: (() => void) | null = null;

    (async () => {
      setLoading(true);
      seedFirestore().catch(() => {});
      await loadPublicData();

      unsubscribe = setupAuthListener(async (firebaseUser: any) => {
        if (!mounted) return;
        try {
          if (firebaseUser) {
            const profile = await fetchUserProfile(firebaseUser.uid);
            const user = normalizeUser(profile ?? {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kullanıcı',
              email: firebaseUser.email || '',
              phone: '',
              role: isAdminEmail(firebaseUser.email) ? 'admin' : 'user',
              createdAt: new Date().toISOString(),
            });
            if (!profile) upsertUserInDb(user).catch(() => {});
            setCurrentUser(user);
            await loadAllData(user.id, user.role);
          } else {
            setCurrentUser(null);
            setApplications([]);
            setContactMessages([]);
          }
        } finally {
          if (mounted) setLoading(false);
        }
      });
    })();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, [loadAllData, loadPublicData]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const profile = await firebaseLogin(email.trim().toLowerCase(), password);
      if (!profile) return false;
      const user = normalizeUser(profile);
      setCurrentUser(user);
      await loadAllData(user.id, user.role);
      return true;
    } catch {
      return false;
    }
  }, [loadAllData]);

  const googleLogin = useCallback(async () => {
    try {
      const result = await firebaseGoogleLogin();
      if (result === 'redirect') return 'redirect';
      if (!result) return null;
      const user = normalizeUser(result);
      upsertUserInDb(user).catch(() => {});
      setCurrentUser(user);
      await loadAllData(user.id, user.role);
      return user;
    } catch {
      return null;
    }
  }, [loadAllData]);

  const register = useCallback(async (name: string, email: string, password: string, phone: string) => {
    try {
      const profile = await firebaseRegister(sanitizeText(name, 120), sanitizeEmail(email), password, sanitizePhone(phone));
      const user = normalizeUser(profile);
      setCurrentUser(user);
      setUsers(prev => [...prev.filter(item => item.id !== user.id), user]);
      await loadAllData(user.id, user.role);
      return true;
    } catch {
      return false;
    }
  }, [loadAllData]);

  const logout = useCallback(() => {
    firebaseLogout().catch(() => {});
    setCurrentUser(null);
    setApplications([]);
    setContactMessages([]);
  }, []);

  const updateUser = useCallback((id: string, data: Partial<User>) => {
    const safeData: Partial<User> = {
      name: data.name ? sanitizeText(data.name, 120) : undefined,
      phone: data.phone !== undefined ? sanitizePhone(data.phone) : undefined,
    };
    setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...safeData } : user)));
    setCurrentUser(prev => (prev && prev.id === id ? { ...prev, ...safeData } : prev));
    updateUserInDb(id, safeData).catch(() => {});
  }, []);

  const updatePassword = useCallback(async (_id: string, oldPass: string, newPass: string) => {
    try {
      return await fbUpdatePassword(oldPass, newPass);
    } catch {
      return false;
    }
  }, []);

  const getService = useCallback((key: string) => services.find(service => service.id === key || service.slug === key), [services]);

  const addService = useCallback((service: Service) => {
    const normalized = normalizeService(service);
    setServices(prev => [...prev, normalized].sort((a, b) => a.order - b.order));
    addServiceToDb(normalized).catch(() => {});
  }, []);

  const updateService = useCallback((id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(service => service.id !== id ? service : normalizeService({ ...service, ...data } as Service)).sort((a, b) => a.order - b.order));
    updateServiceInDb(id, data).catch(() => {});
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
    deleteServiceFromDb(id).catch(() => {});
  }, []);

  const getUserApplications = useCallback((userId: string) => applications.filter(app => app.userId === userId), [applications]);
  const getApplication = useCallback((id: string) => applications.find(app => app.id === id), [applications]);

  const getApplicationByTracking = useCallback(async (trackingNumber: string) => {
    const local = applications.find(app => app.trackingNumber === trackingNumber.toUpperCase());
    if (local) return toPublicTracking(local);
    return (await fetchPublicTrackingByTracking(trackingNumber)) ?? undefined;
  }, [applications]);

  const createApplication = useCallback((data: Omit<Application, 'id' | 'trackingNumber' | 'status' | 'statusName' | 'notes' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const application: Application = {
      ...data,
      id: generateId(),
      trackingNumber: generateTracking(),
      status: 'pending',
      statusName: statusMap.pending,
      notes: [{ date: now, text: 'Başvuru alındı ve sisteme kaydedildi.', by: 'system' }],
      createdAt: now,
      updatedAt: now,
      additionalInfo: sanitizeTextarea(data.additionalInfo || '', 3000),
      userPhone: sanitizePhone(data.userPhone || ''),
      userName: sanitizeText(data.userName, 120),
      serviceTitle: sanitizeText(data.serviceTitle, 200),
      country: sanitizeText(data.country, 80),
      documents: data.documents.slice(0, 40).map(doc => sanitizeText(doc, 180)),
      personalInfo: {
        firstName: sanitizeText(data.personalInfo.firstName, 80),
        lastName: sanitizeText(data.personalInfo.lastName, 80),
        birthDate: data.personalInfo.birthDate,
        nationality: sanitizeText(data.personalInfo.nationality, 80),
        passportNumber: sanitizeText(data.personalInfo.passportNumber, 20).toUpperCase(),
        address: sanitizeTextarea(data.personalInfo.address, 300),
      },
    };

    setApplications(prev => [...prev, application]);
    addApplicationToDb(application).catch(() => {});
    upsertTrackingInDb(toPublicTracking(application)).catch(() => {});
    return application;
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: Application['status']) => {
    const now = new Date().toISOString();
    setApplications(prev => prev.map(application => {
      if (application.id !== id) return application;
      const updated: Application = {
        ...application,
        status,
        statusName: statusMap[status],
        updatedAt: now,
        notes: [...application.notes, { date: now, text: `Durum güncellendi: ${statusMap[status]}`, by: 'admin' }],
      };
      updateApplicationInDb(id, { status, statusName: statusMap[status], updatedAt: now, notes: updated.notes }).catch(() => {});
      upsertTrackingInDb(toPublicTracking(updated)).catch(() => {});
      return updated;
    }));
  }, []);

  const addApplicationNote = useCallback((applicationId: string, text: string) => {
    const cleaned = sanitizeTextarea(text, 300);
    if (!cleaned) return;
    const now = new Date().toISOString();
    setApplications(prev => prev.map(application => {
      if (application.id !== applicationId) return application;
      const updated: Application = { ...application, updatedAt: now, notes: [...application.notes, { date: now, text: cleaned, by: 'admin' }] };
      updateApplicationInDb(applicationId, { updatedAt: now, notes: updated.notes }).catch(() => {});
      upsertTrackingInDb(toPublicTracking(updated)).catch(() => {});
      return updated;
    }));
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications(prev => prev.filter(application => application.id !== id));
    deleteApplicationFromDb(id).catch(() => {});
    deleteTrackingFromDb(id).catch(() => {});
  }, []);

  const createContactMessage = useCallback(async (message: Omit<ContactMessage, 'id' | 'status' | 'adminNote' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const item: ContactMessage = {
        id: generateId(),
        name: sanitizeText(message.name, 120),
        email: sanitizeEmail(message.email),
        phone: sanitizePhone(message.phone),
        subject: sanitizeText(message.subject, 120),
        message: sanitizeTextarea(message.message, 1500),
        status: 'new',
        adminNote: '',
        createdAt: now,
        updatedAt: now,
      };
      await addContactMessageToDb(item);
      setContactMessages(prev => [item, ...prev]);
      return true;
    } catch {
      return false;
    }
  }, []);

  const updateContactMessage = useCallback((id: string, data: Partial<ContactMessage>) => {
    const safeData: Partial<ContactMessage> = {
      subject: data.subject !== undefined ? sanitizeText(data.subject, 120) : undefined,
      adminNote: data.adminNote !== undefined ? sanitizeTextarea(data.adminNote, 500) : undefined,
      status: data.status,
      updatedAt: new Date().toISOString(),
    };
    setContactMessages(prev => prev.map(item => item.id === id ? { ...item, ...safeData } as ContactMessage : item));
    updateContactMessageInDb(id, safeData).catch(() => {});
  }, []);

  const deleteContactMessage = useCallback((id: string) => {
    setContactMessages(prev => prev.filter(item => item.id !== id));
    deleteContactMessageFromDb(id).catch(() => {});
  }, []);

  const addTestimonial = useCallback((testimonial: Testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
    addTestimonialToDb(testimonial).catch(() => {});
  }, []);

  const updateTestimonial = useCallback((id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    updateTestimonialInDb(id, data).catch(() => {});
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
    deleteTestimonialFromDb(id).catch(() => {});
  }, []);

  const addFAQ = useCallback((faq: FAQ) => {
    setFaqs(prev => [...prev, faq]);
    addFAQToDb(faq).catch(() => {});
  }, []);

  const updateFAQ = useCallback((id: string, data: Partial<FAQ>) => {
    setFaqs(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    updateFAQInDb(id, data).catch(() => {});
  }, []);

  const deleteFAQ = useCallback((id: string) => {
    setFaqs(prev => prev.filter(item => item.id !== id));
    deleteFAQFromDb(id).catch(() => {});
  }, []);

  const updateSettings = useCallback((data: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
    updateSettingsInDb(data).catch(() => {});
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        currentUser,
        login,
        googleLogin,
        register,
        logout,
        updateUser,
        updatePassword,
        services,
        getService,
        addService,
        updateService,
        deleteService,
        applications,
        getUserApplications,
        getApplication,
        getApplicationByTracking,
        createApplication,
        updateApplicationStatus,
        addApplicationNote,
        deleteApplication,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        contactMessages,
        createContactMessage,
        updateContactMessage,
        deleteContactMessage,
        settings,
        updateSettings,
        users,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
