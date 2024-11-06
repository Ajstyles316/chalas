// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq8phbdWUe2z_HshnYacainqgqLymJAto",
  authDomain: "chalitaoepro-app.firebaseapp.com",
  projectId: "chalitaoepro-app",
  storageBucket: "chalitaoepro-app.firebasestorage.app",
  messagingSenderId: "654774098786",
  appId: "1:654774098786:web:a239221160ade6ce106a3b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(appFirebase);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export {db, auth, googleProvider, facebookProvider};
export default appFirebase;