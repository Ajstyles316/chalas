import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export const saveUserData = async (uid, data) => setDoc(doc(db, 'users', uid), data);

export const getUserData = async (uid) => getDoc(doc(db, 'users', uid));
