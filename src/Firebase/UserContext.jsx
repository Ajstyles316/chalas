import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./users"; // Asegúrate de que esta función esté definida correctamente.

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid); // Obtener los datos del usuario
          setUser(userData); // Guardar los datos del usuario en el estado
        } catch (err) {
          setError(err);
        }
      } else {
        setUser(null); // No hay usuario autenticado
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar el observador cuando el componente se desmonte
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
