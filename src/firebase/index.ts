import { initializeApp } from 'firebase/app';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updatePassword as firebaseAuthUpdatePassword,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { Application, ContactMessage, FAQ, PublicTracking, Service, SiteSettings, Testimonial, User } from '../types';
import { initialFAQs, initialServices, initialSettings, initialTestimonials } from '../data/initialData';
import { isAdminEmail } from '../utils/site';

const firebaseConfig = {
  apiKey: 'AIzaSyBZu2rhh2t74DVrSmEMbd-ObMN3k2jEcmE',
  authDomain: 'gen-lang-client-0991913364.firebaseapp.com',
  projectId: 'gen-lang-client-0991913364',
  storageBucket: 'gen-lang-client-0991913364.firebasestorage.app',
  messagingSenderId: '283825921477',
  appId: '1:283825921477:web:db908a3ff5f4ff235f3fac',
};

let firebaseOk = false;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let servicesCol: ReturnType<typeof collection> | null = null;
let applicationsCol: ReturnType<typeof collection> | null = null;
let trackingCol: ReturnType<typeof collection> | null = null;
let testimonialsCol: ReturnType<typeof collection> | null = null;
let faqsCol: ReturnType<typeof collection> | null = null;
let usersCol: ReturnType<typeof collection> | null = null;
let contactMessagesCol: ReturnType<typeof collection> | null = null;
let settingsDocRef: ReturnType<typeof doc> | null = null;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  servicesCol = collection(db, 'services');
  applicationsCol = collection(db, 'applications');
  trackingCol = collection(db, 'tracking');
  testimonialsCol = collection(db, 'testimonials');
  faqsCol = collection(db, 'faqs');
  usersCol = collection(db, 'users');
  contactMessagesCol = collection(db, 'contactMessages');
  settingsDocRef = doc(db, 'settings', 'main');
  firebaseOk = true;
} catch (error) {
  console.warn('⚠️ Firebase başlatılamadı:', error);
}

export function isFirebaseReady() {
  return firebaseOk;
}

export { auth };

function timeout<T>(promise: Promise<T>, ms = 6000): Promise<T | null> {
  return Promise.race([promise, new Promise<null>(resolve => setTimeout(() => resolve(null), ms))]);
}

const normalizeUser = (user: Partial<User> & Pick<User, 'id' | 'email'>): User => ({
  id: user.id,
  name: user.name || user.email.split('@')[0],
  email: user.email,
  phone: user.phone || '',
  role: isAdminEmail(user.email) ? 'admin' : user.role === 'admin' ? 'admin' : 'user',
  createdAt: user.createdAt || new Date().toISOString(),
});

export async function seedFirestore(): Promise<void> {
  if (!firebaseOk || !servicesCol || !db) return;
  try {
    const servicesSnap = await timeout(getDocs(servicesCol));
    if (!servicesSnap || !servicesSnap.empty) return;

    const writes: Promise<void>[] = [];
    for (const service of initialServices) writes.push(setDoc(doc(db, 'services', service.id), { ...service }));
    for (const testimonial of initialTestimonials) writes.push(setDoc(doc(db, 'testimonials', testimonial.id), { ...testimonial }));
    for (const faq of initialFAQs) writes.push(setDoc(doc(db, 'faqs', faq.id), { ...faq }));
    writes.push(setDoc(doc(db, 'settings', 'main'), { ...initialSettings }));
    await Promise.all(writes);
  } catch (error) {
    console.warn('Seed hatası:', error);
  }
}

export async function fetchAllServices(): Promise<Service[]> {
  if (!firebaseOk || !servicesCol) return [];
  try {
    const snap = await timeout(getDocs(servicesCol));
    return snap ? snap.docs.map(d => d.data() as Service) : [];
  } catch {
    return [];
  }
}

export async function fetchAllApplications(): Promise<Application[]> {
  if (!firebaseOk || !applicationsCol) return [];
  try {
    const snap = await timeout(getDocs(applicationsCol));
    return snap ? snap.docs.map(d => d.data() as Application) : [];
  } catch {
    return [];
  }
}

export async function fetchApplicationsByUser(uid: string): Promise<Application[]> {
  if (!firebaseOk || !applicationsCol) return [];
  try {
    const snap = await timeout(getDocs(query(applicationsCol, where('userId', '==', uid))));
    return snap ? snap.docs.map(d => d.data() as Application) : [];
  } catch {
    return [];
  }
}

export async function fetchPublicTrackingByTracking(trackingNumber: string): Promise<PublicTracking | null> {
  if (!firebaseOk || !trackingCol) return null;
  try {
    const snap = await timeout(getDocs(query(trackingCol, where('trackingNumber', '==', trackingNumber.toUpperCase()))));
    return snap && !snap.empty ? (snap.docs[0].data() as PublicTracking) : null;
  } catch {
    return null;
  }
}

export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  if (!firebaseOk || !testimonialsCol) return [];
  try {
    const snap = await timeout(getDocs(testimonialsCol));
    return snap ? snap.docs.map(d => d.data() as Testimonial) : [];
  } catch {
    return [];
  }
}

export async function fetchAllFAQs(): Promise<FAQ[]> {
  if (!firebaseOk || !faqsCol) return [];
  try {
    const snap = await timeout(getDocs(faqsCol));
    return snap ? snap.docs.map(d => d.data() as FAQ) : [];
  } catch {
    return [];
  }
}

export async function fetchSettings(): Promise<Partial<SiteSettings> | null> {
  if (!firebaseOk || !settingsDocRef) return null;
  try {
    const snap = await timeout(getDoc(settingsDocRef));
    return snap && snap.exists() ? (snap.data() as Partial<SiteSettings>) : null;
  } catch {
    return null;
  }
}

export async function fetchAllUsers(): Promise<User[]> {
  if (!firebaseOk || !usersCol) return [];
  try {
    const snap = await timeout(getDocs(usersCol));
    return snap ? snap.docs.map(d => normalizeUser(d.data() as User)) : [];
  } catch {
    return [];
  }
}

export async function fetchAllContactMessages(): Promise<ContactMessage[]> {
  if (!firebaseOk || !contactMessagesCol) return [];
  try {
    const snap = await timeout(getDocs(contactMessagesCol));
    return snap ? snap.docs.map(d => d.data() as ContactMessage) : [];
  } catch {
    return [];
  }
}

export async function fetchUserProfile(uid: string): Promise<User | null> {
  if (!firebaseOk || !db) return null;
  try {
    const direct = await timeout(getDoc(doc(db, 'users', uid)));
    if (direct && direct.exists()) return normalizeUser(direct.data() as User);

    if (!usersCol || !auth?.currentUser?.email) {
      return auth?.currentUser?.email
        ? normalizeUser({ id: uid, email: auth.currentUser.email, name: auth.currentUser.displayName || undefined })
        : null;
    }

    const fallback = await timeout(getDocs(query(usersCol, where('email', '==', auth.currentUser.email))));
    return fallback && !fallback.empty
      ? normalizeUser(fallback.docs[0].data() as User)
      : normalizeUser({ id: uid, email: auth.currentUser.email, name: auth.currentUser.displayName || undefined });
  } catch {
    return auth?.currentUser?.email
      ? normalizeUser({ id: uid, email: auth.currentUser.email, name: auth.currentUser.displayName || undefined })
      : null;
  }
}

export async function firebaseLogin(email: string, password: string): Promise<User | null> {
  if (!firebaseOk || !auth) return null;
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(credential.user.uid);
    return profile ?? normalizeUser({
      id: credential.user.uid,
      email: credential.user.email || email,
      name: credential.user.displayName || email.split('@')[0],
    });
  } catch {
    return null;
  }
}

export async function firebaseRegister(name: string, email: string, password: string, phone: string): Promise<User> {
  if (!firebaseOk || !auth || !db) throw new Error('Firebase kullanılamıyor');
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = normalizeUser({
    id: credential.user.uid,
    name,
    email: credential.user.email || email,
    phone,
    role: isAdminEmail(email) ? 'admin' : 'user',
    createdAt: new Date().toISOString(),
  });
  await setDoc(doc(db, 'users', credential.user.uid), user);
  return user;
}

export async function firebaseGoogleLogin(): Promise<User | 'redirect' | null> {
  if (!firebaseOk || !auth || !db) throw new Error('Firebase kullanılamıyor');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const credential = await signInWithPopup(auth, provider);
    let profile = await fetchUserProfile(credential.user.uid);
    if (!profile) {
      profile = normalizeUser({
        id: credential.user.uid,
        email: credential.user.email || '',
        name: credential.user.displayName || undefined,
        createdAt: new Date().toISOString(),
      });
      await setDoc(doc(db, 'users', credential.user.uid), profile);
    }
    return profile;
  } catch (error: any) {
    const code = error?.code || '';
    if (['auth/popup-blocked', 'auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/operation-not-supported-in-this-environment'].includes(code)) {
      await signInWithRedirect(auth, provider);
      return 'redirect';
    }
    console.warn('Google giriş hatası:', error);
    return null;
  }
}

export async function firebaseLogout(): Promise<void> {
  if (auth) await signOut(auth);
}

export function setupAuthListener(cb: (user: any) => void): () => void {
  if (!firebaseOk || !auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

export async function firebaseUpdatePassword(oldPassword: string, newPassword: string): Promise<boolean> {
  if (!auth?.currentUser?.email) return false;
  try {
    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, oldPassword));
    await firebaseAuthUpdatePassword(auth.currentUser, newPassword);
    return true;
  } catch {
    return false;
  }
}

async function setDocument(collectionName: string, id: string, data: unknown) {
  if (!firebaseOk || !db) return;
  try {
    await setDoc(doc(db, collectionName, id), data as never);
  } catch {}
}

async function updateDocument(collectionName: string, id: string, data: unknown) {
  if (!firebaseOk || !db) return;
  try {
    await updateDoc(doc(db, collectionName, id), data as never);
  } catch {}
}

async function deleteDocument(collectionName: string, id: string) {
  if (!firebaseOk || !db) return;
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch {}
}

export const addServiceToDb = (service: Service) => setDocument('services', service.id, { ...service });
export const updateServiceInDb = (id: string, data: Partial<Service>) => updateDocument('services', id, data);
export const deleteServiceFromDb = (id: string) => deleteDocument('services', id);

export const addApplicationToDb = (application: Application) => setDocument('applications', application.id, { ...application });
export const updateApplicationInDb = (id: string, data: Partial<Application>) => updateDocument('applications', id, data);
export const deleteApplicationFromDb = (id: string) => deleteDocument('applications', id);

export const upsertTrackingInDb = (tracking: PublicTracking) => setDocument('tracking', tracking.id, { ...tracking });
export const deleteTrackingFromDb = (id: string) => deleteDocument('tracking', id);

export const addTestimonialToDb = (testimonial: Testimonial) => setDocument('testimonials', testimonial.id, { ...testimonial });
export const updateTestimonialInDb = (id: string, data: Partial<Testimonial>) => updateDocument('testimonials', id, data);
export const deleteTestimonialFromDb = (id: string) => deleteDocument('testimonials', id);

export const addFAQToDb = (faq: FAQ) => setDocument('faqs', faq.id, { ...faq });
export const updateFAQInDb = (id: string, data: Partial<FAQ>) => updateDocument('faqs', id, data);
export const deleteFAQFromDb = (id: string) => deleteDocument('faqs', id);

export const addContactMessageToDb = (message: ContactMessage) => setDocument('contactMessages', message.id, { ...message });
export const updateContactMessageInDb = (id: string, data: Partial<ContactMessage>) => updateDocument('contactMessages', id, data);
export const deleteContactMessageFromDb = (id: string) => deleteDocument('contactMessages', id);

export const upsertUserInDb = (user: User) => setDocument('users', user.id, { ...user });
export const updateSettingsInDb = (data: Partial<SiteSettings>) => updateDocument('settings', 'main', data);
export const updateUserInDb = (id: string, data: Partial<User>) => updateDocument('users', id, data);
