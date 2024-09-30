// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chalitaoe-app.firebaseapp.com",
  projectId: "chalitaoe-app",
  storageBucket: "chalitaoe-app.appspot.com",
  messagingSenderId: "824451195246",
  appId: "1:824451195246:web:392cae32ceeb01d57be17f",
  measurementId: "G-E3WCSBY17X"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export default appFirebase;