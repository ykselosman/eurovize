import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, updatePassword as firebaseAuthUpdatePassword,
  reauthenticateWithCredential, EmailAuthProvider,
  GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc,
  updateDoc, deleteDoc, query, where
} from 'firebase/firestore';
import type { Service, Testimonial, FAQ, SiteSettings, Application, User } from '../types';
import { initialServices, initialTestimonials, initialFAQs, initialSettings, defaultAdmin } from '../data/initialData';

/* ─── Init ─── */
const firebaseConfig = {
  apiKey: "AIzaSyBZu2rhh2t74DVrSmEMbd-ObMN3k2jEcmE",
  authDomain: "gen-lang-client-0991913364.firebaseapp.com",
  projectId: "gen-lang-client-0991913364",
  storageBucket: "gen-lang-client-0991913364.firebasestorage.app",
  messagingSenderId: "283825921477",
  appId: "1:283825921477:web:db908a3ff5f4ff235f3fac"
};

let firebaseOk = false;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let servicesCol: ReturnType<typeof collection> | null = null;
let applicationsCol: ReturnType<typeof collection> | null = null;
let testimonialsCol: ReturnType<typeof collection> | null = null;
let faqsCol: ReturnType<typeof collection> | null = null;
let usersCol: ReturnType<typeof collection> | null = null;
let settingsDocRef: ReturnType<typeof doc> | null = null;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  servicesCol = collection(db, 'services');
  applicationsCol = collection(db, 'applications');
  testimonialsCol = collection(db, 'testimonials');
  faqsCol = collection(db, 'faqs');
  usersCol = collection(db, 'users');
  settingsDocRef = doc(db, 'settings', 'main');
  firebaseOk = true;
} catch (e) {
  console.warn('⚠️ Firebase başlatılamadı:', e);
}

export function isFirebaseReady() { return firebaseOk; }
export { auth };

/* ─── Helpers ─── */
function timeout<T>(p: Promise<T>, ms = 5000): Promise<T | null> {
  return Promise.race([p, new Promise<null>(r => setTimeout(() => r(null), ms))]);
}

/* ─── Seed ─── */
export async function seedFirestore(): Promise<void> {
  if (!firebaseOk || !servicesCol || !db) return;
  try {
    const snap = await timeout(getDocs(servicesCol));
    if (!snap || !snap.empty) return;
    const b: Promise<void>[] = [];
    for (const s of initialServices) b.push(setDoc(doc(db, 'services', s.id), { ...s }));
    for (const t of initialTestimonials) b.push(setDoc(doc(db, 'testimonials', t.id), { ...t }));
    for (const f of initialFAQs) b.push(setDoc(doc(db, 'faqs', f.id), { ...f }));
    b.push(setDoc(doc(db, 'settings', 'main'), { ...initialSettings }));
    b.push(setDoc(doc(db, 'users', 'admin'), {
      id: 'admin', name: defaultAdmin.name, email: defaultAdmin.email,
      password: '', phone: defaultAdmin.phone, role: 'admin', createdAt: defaultAdmin.createdAt
    }));
    await Promise.all(b);
  } catch (e) { console.warn('Seed hatası:', e); }
}

/* ─── Fetch ─── */
export async function fetchAllServices(): Promise<Service[]> {
  if (!firebaseOk || !servicesCol) return [];
  try {
    const s = await timeout(getDocs(servicesCol));
    return s ? s.docs.map(d => d.data() as Service) : [];
  } catch { return []; }
}

export async function fetchAllApplications(): Promise<Application[]> {
  if (!firebaseOk || !applicationsCol) return [];
  try {
    const s = await timeout(getDocs(applicationsCol));
    return s ? s.docs.map(d => d.data() as Application) : [];
  } catch { return []; }
}

export async function fetchApplicationsByUser(uid: string): Promise<Application[]> {
  if (!firebaseOk || !applicationsCol) return [];
  try {
    const q = query(applicationsCol, where('userId', '==', uid));
    const s = await timeout(getDocs(q));
    return s ? s.docs.map(d => d.data() as Application) : [];
  } catch { return []; }
}

export async function fetchApplicationByTracking(tn: string): Promise<Application | null> {
  if (!firebaseOk || !applicationsCol) return null;
  try {
    const q = query(applicationsCol, where('trackingNumber', '==', tn.toUpperCase()));
    const s = await timeout(getDocs(q));
    return s && !s.empty ? (s.docs[0].data() as Application) : null;
  } catch { return null; }
}

export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  if (!firebaseOk || !testimonialsCol) return [];
  try {
    const s = await timeout(getDocs(testimonialsCol));
    return s ? s.docs.map(d => d.data() as Testimonial) : [];
  } catch { return []; }
}

export async function fetchAllFAQs(): Promise<FAQ[]> {
  if (!firebaseOk || !faqsCol) return [];
  try {
    const s = await timeout(getDocs(faqsCol));
    return s ? s.docs.map(d => d.data() as FAQ) : [];
  } catch { return []; }
}

export async function fetchSettings(): Promise<Partial<SiteSettings> | null> {
  if (!firebaseOk || !settingsDocRef) return null;
  try {
    const s = await timeout(getDoc(settingsDocRef));
    return s && s.exists() ? (s.data() as Partial<SiteSettings>) : null;
  } catch { return null; }
}

export async function fetchAllUsers(): Promise<User[]> {
  if (!firebaseOk || !usersCol) return [];
  try {
    const s = await timeout(getDocs(usersCol));
    return s ? s.docs.map(d => d.data() as User) : [];
  } catch { return []; }
}

export async function fetchUserProfile(uid: string): Promise<User | null> {
  if (!firebaseOk || !db) return null;
  try {
    const s = await timeout(getDoc(doc(db, 'users', uid)));
    if (s && s.exists()) return s.data() as User;
    if (!usersCol) return null;
    const q = query(usersCol, where('email', '==', auth?.currentUser?.email));
    const qs = await timeout(getDocs(q));
    return qs && !qs.empty ? (qs.docs[0].data() as User) : null;
  } catch { return null; }
}

/* ─── Auth ─── */
export async function firebaseLogin(email: string, pw: string): Promise<User | null> {
  if (!firebaseOk || !auth) return null;
  try {
    const c = await signInWithEmailAndPassword(auth, email, pw);
    const p = await fetchUserProfile(c.user.uid);
    return p ?? {
      id: c.user.uid, name: c.user.displayName || email.split('@')[0],
      email: c.user.email || email, password: '', phone: '',
      role: email === defaultAdmin.email ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };
  } catch { return null; }
}

export async function firebaseRegister(name: string, email: string, pw: string, phone: string): Promise<User> {
  if (!firebaseOk || !auth || !db) throw new Error('Firebase yok');
  const c = await createUserWithEmailAndPassword(auth, email, pw);
  const u: User = { id: c.user.uid, name, email, password: '', phone, role: 'user', createdAt: new Date().toISOString() };
  await setDoc(doc(db, 'users', c.user.uid), u);
  return u;
}

export async function firebaseGoogleLogin(): Promise<User> {
  if (!firebaseOk || !auth || !db) throw new Error('Firebase yok');
  const c = await signInWithPopup(auth, new GoogleAuthProvider());
  let p = await fetchUserProfile(c.user.uid);
  if (!p) {
    p = { id: c.user.uid, name: c.user.displayName || c.user.email?.split('@')[0] || 'Kullanıcı', email: c.user.email || '', password: '', phone: '', role: 'user', createdAt: new Date().toISOString() };
    await setDoc(doc(db, 'users', c.user.uid), p);
  }
  return p;
}

export async function firebaseLogout(): Promise<void> {
  if (auth) await signOut(auth);
}

export function setupAuthListener(cb: (u: any) => void): () => void {
  if (!firebaseOk || !auth) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}

export async function firebaseUpdatePassword(oldP: string, newP: string): Promise<boolean> {
  if (!auth?.currentUser?.email) return false;
  try {
    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, oldP));
    await firebaseAuthUpdatePassword(auth.currentUser, newP);
    return true;
  } catch { return false; }
}

/* ─── CRUD ─── */
async function w(collection: string, id: string, data: any) {
  if (!firebaseOk || !db) return;
  try { await setDoc(doc(db, collection, id), data); } catch {}
}
async function u(collection: string, id: string, data: any) {
  if (!firebaseOk || !db) return;
  try { await updateDoc(doc(db, collection, id), data); } catch {}
}
async function d(collection: string, id: string) {
  if (!firebaseOk || !db) return;
  try { await deleteDoc(doc(db, collection, id)); } catch {}
}

export const addServiceToDb = (s: Service) => w('services', s.id, { ...s });
export const updateServiceInDb = (id: string, data: any) => u('services', id, data);
export const deleteServiceFromDb = (id: string) => d('services', id);
export const addApplicationToDb = (a: Application) => w('applications', a.id, { ...a });
export const updateApplicationInDb = (id: string, data: any) => u('applications', id, data);
export const deleteApplicationFromDb = (id: string) => d('applications', id);
export const addTestimonialToDb = (t: Testimonial) => w('testimonials', t.id, { ...t });
export const updateTestimonialInDb = (id: string, data: any) => u('testimonials', id, data);
export const deleteTestimonialFromDb = (id: string) => d('testimonials', id);
export const addFAQToDb = (f: FAQ) => w('faqs', f.id, { ...f });
export const updateFAQInDb = (id: string, data: any) => u('faqs', id, data);
export const deleteFAQFromDb = (id: string) => d('faqs', id);
export const updateSettingsInDb = (data: any) => u('settings', 'main', data);
export const updateUserInDb = (id: string, data: any) => u('users', id, data);
