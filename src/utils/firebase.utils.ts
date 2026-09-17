import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  DocumentReference,
  getFirestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
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
import { Product } from '@models/interfaces';

// Initialize Firebase
initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

export const addCategoriesAndDocuments = async (
  collectionKey: string,
  objectsToAdd: [{ title: string; items: Product[] }],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<{ [key: string]: Product[] }> => {
  const collectionRef = collection(db, 'categories');
  const collectionQuery = query(collectionRef);

  const querySnapshot = await getDocs(collectionQuery);

  return querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();

      acc[title.toLowerCase()] = items;

      return acc;
    },
    {} as { [key: string]: Product[] },
  );
};
