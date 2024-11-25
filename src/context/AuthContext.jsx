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
import { auth, db, facebookProvider } from "../Firebase/config"; // Configuración de Firebase
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
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
        pay: metodoPago || "",
        target_number: numeroTarjeta.replace(/.(?=.{4})/g, "*"),
        vcc: true,
        datev: fechaVencimiento,
      },
      email: correo,
      role: "provider",
      uid: null, // Se asigna después
      createdAt: new Date().toISOString(),
      isActive: true,
    };
  
    
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
    const user = userCredential.user;
  
    additionalData.uid = user.uid;
  
    
    await setDoc(doc(db, "provider", user.uid), additionalData);
  
    return user;
  };
  

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    console.log("Usuario autenticado:", user.uid);
  
    const roles = ['admin', 'provider', 'client'];
    for (const role of roles) {
      const userDocRef = doc(db, role, user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists() && userDoc.data().isActive) {
        console.log("Usuario encontrado en la colección:", role);
        return { user, role };
      }
    }
  
    console.log("Usuario no encontrado o deshabilitado.");
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

  const loginWithFacebook = async() => {
    const facebookProvider = new FacebookAuthProvider(auth, facebookProvider);
    const result = await signInWithPopup(auth, facebookProvider);
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
  }

  const logout = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const register = async (email, password, name) => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      
      const userRef = doc(db, "client", user.uid);
      await setDoc(userRef, {
        uid: user.uid, 
        email: user.email, 
        role: "client", 
        isActive: true, 
        createdAt: new Date().toISOString(), 
      });
  
      setUser(user); 
    } catch (error) {
      throw error; 
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const roles = ["admin", "provider", "client"];
        let userRole = null;
  
        for (const role of roles) {
          const userDocRef = doc(db, role, currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            userRole = role;
            break;
          }
        }
  
        setUser({ ...currentUser, role: userRole }); // Agrega el rol al estado del usuario
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        registerProvider,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
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
