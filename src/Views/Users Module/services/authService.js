import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../../../Firebase/config';

const auth = getAuth(appFirebase);

export const registerUser = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = async (email, password) => signInWithEmailAndPassword(auth, email, password);

export const socialLogin = async (provider) => signInWithPopup(auth, provider);
