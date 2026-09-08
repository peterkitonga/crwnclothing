import { initializeApp } from 'firebase/app';
import { doc, DocumentReference, getFirestore, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyDymM4FTMKIInlZBzp2Em0j-8EPV2-UBPQ',
  authDomain: 'crwn-clothing-57a8e.firebaseapp.com',
  projectId: 'crwn-clothing-57a8e',
  storageBucket: 'crwn-clothing-57a8e.firebasestorage.app',
  messagingSenderId: '302746794693',
  appId: '1:302746794693:web:e2ce0c0917578657a1ceac',
});

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInfo = {},
): Promise<DocumentReference | undefined> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
    } catch (err) {
      const error = err as Error;

      console.error('Error creating user doc:', error.message);
    }
  }

  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential | undefined> => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential | undefined> => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);
