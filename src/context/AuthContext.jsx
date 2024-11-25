import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/config"; // Configuración de Firebase
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, role, additionalData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
      isActive: true,
      ...additionalData,
    };

    await setDoc(doc(db, role, user.uid), userData);

    return user;
  };

  const registerProvider = async (providerData) => {
    const {
      nombre,
      apellido,
      celular,
      tiendaNombre,
      direccion,
      nroCarnet,
      correo,
      contrasena,
      confirmarContrasena,
      tipoEvento,
      metodoPago,
      numeroTarjeta,
      vcc,
      fechaVencimiento,
    } = providerData;

    if (contrasena !== confirmarContrasena) {
      throw new Error("Las contraseñas no coinciden.");
    }

    const today = new Date();
    const expirationDate = new Date(fechaVencimiento);
    if (expirationDate <= today) {
      throw new Error("La fecha de vencimiento de la tarjeta no es válida.");
    }

    const additionalData = {
      firstName: nombre,
      lastName: apellido,
      storeName: tiendaNombre,
      address: direccion,
      phone: celular,
      idNumber: nroCarnet,
      eventType: tipoEvento,
      payment: {
        pay: metodoPago,
        target_number: numeroTarjeta.replace(/.(?=.{4})/g, "*"), // Oculta los números excepto los últimos 4
        vcc,
        datev: fechaVencimiento,
      },
    };

    return signup(correo, contrasena, "provider", additionalData);
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const roles = ["admin", "provider", "client"];
    for (const role of roles) {
      const userDocRef = doc(db, role, user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().isActive) {
        return { user, role };
      }
    }

    throw new Error("Cuenta deshabilitada o no encontrada.");
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDocRef = doc(db, "client", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        role: "client",
        createdAt: new Date().toISOString(),
        isActive: true,
      });
    }

    return user;
  };

  const logout = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        registerProvider,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
