import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  updateProfile,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  Firestore
} from 'firebase/firestore';

import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

/**
 * Firebase Client Configuration
 * Populated from Vite environment variables (VITE_FIREBASE_*)
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

/**
 * Checks if Firebase has valid configuration in .env
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.length > 10 && 
    firebaseConfig.projectId
  );
};

// Initialize Firebase App safely (singleton)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();

    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      isSupported().then(supported => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('[VIDYA Firebase] Initialization error:', err);
  }
} else {
  console.info('[VIDYA Firebase] Running in Local Storage Fallback Mode. Add Firebase keys in .env to enable Cloud Sync.');
}

export { app, auth, db, analytics };

// ==========================================
// 🔐 AUTHENTICATION HELPERS
// ==========================================

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'student' | 'educator';
  examTarget?: string;
  isLoggedIn: boolean;
}

/**
 * Google Sign-In with popup
 */
export async function loginWithGoogle(): Promise<UserProfile> {
  if (!isFirebaseConfigured() || !auth || !googleProvider) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }

  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const profile: UserProfile = {
    uid: user.uid,
    name: user.displayName || 'Learner',
    email: user.email || '',
    avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: 'student',
    examTarget: 'B.Tech CSE & GATE',
    isLoggedIn: true
  };

  // Upsert user profile to Firestore
  if (db) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        lastLogin: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Could not sync user profile to Firestore:', err);
    }
  }

  return profile;
}

/**
 * Sign In with Email and Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<UserProfile> {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }

  const result = await signInWithEmailAndPassword(auth, email, pass);
  const user = result.user;

  let storedProfile: Partial<UserProfile> = {};
  if (db) {
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        storedProfile = snap.data() as Partial<UserProfile>;
      }
    } catch (e) {
      console.warn('Could not read user profile from Firestore:', e);
    }
  }

  return {
    uid: user.uid,
    name: storedProfile.name || user.displayName || email.split('@')[0],
    email: user.email || email,
    avatar: storedProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: storedProfile.role || 'student',
    examTarget: storedProfile.examTarget || 'B.Tech CSE & GATE',
    isLoggedIn: true
  };
}

/**
 * Sign Up with Email and Password
 */
export async function registerWithEmail(
  name: string,
  email: string,
  pass: string,
  examTarget: string = 'B.Tech CSE'
): Promise<UserProfile> {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }

  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const user = result.user;

  if (name) {
    await updateProfile(user, { displayName: name }).catch(() => {});
  }

  const profile: UserProfile = {
    uid: user.uid,
    name: name || email.split('@')[0],
    email: user.email || email,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: 'student',
    examTarget: examTarget,
    isLoggedIn: true
  };

  if (db) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } catch (err) {
      console.warn('Could not write user profile to Firestore:', err);
    }
  }

  return profile;
}

/**
 * Sign Out
 */
export async function logoutUser(): Promise<void> {
  if (auth && isFirebaseConfigured()) {
    await fbSignOut(auth);
  }
}

/**
 * Listen to Auth changes
 */
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  if (!auth || !isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// ==========================================
// 📊 FIRESTORE DATA SYNC HELPERS
// ==========================================

/**
 * Syncs user's Cognitive Memory Twin retention profile to Cloud Firestore
 */
export async function syncMemoryStateToCloud(
  userId: string,
  subjectId: string,
  memoryData: {
    stabilityDays: number;
    daysSinceStudy: number;
    reviewsDone: number;
    lastStudiedDate: string;
    topic: string;
  }
): Promise<boolean> {
  if (!db || !isFirebaseConfigured() || !userId) {
    return false;
  }

  try {
    const memoryDocRef = doc(db, 'users', userId, 'memory_twin', subjectId);
    await setDoc(memoryDocRef, {
      ...memoryData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firestore] Error saving memory profile:', err);
    return false;
  }
}

/**
 * Fetches user's Cognitive Memory Twin retention profile from Cloud Firestore
 */
export async function fetchMemoryStateFromCloud(
  userId: string,
  subjectId: string
): Promise<any | null> {
  if (!db || !isFirebaseConfigured() || !userId) {
    return null;
  }

  try {
    const snap = await getDoc(doc(db, 'users', userId, 'memory_twin', subjectId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.warn('[Firestore] Error fetching memory profile:', err);
    return null;
  }
}

/**
 * Records mock test evaluation score in Cloud Firestore
 */
export async function recordMockTestToCloud(
  userId: string,
  testData: {
    subject: string;
    score: number;
    maxScore: number;
    percentage: number;
    weakTopics: string[];
    feedback: string;
  }
): Promise<string | null> {
  if (!db || !isFirebaseConfigured() || !userId) {
    return null;
  }

  try {
    const testsCol = collection(db, 'users', userId, 'test_history');
    const docRef = await addDoc(testsCol, {
      ...testData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn('[Firestore] Error recording mock test:', err);
    return null;
  }
}
