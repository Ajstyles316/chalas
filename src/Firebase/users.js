import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { appFirebase } from "./config";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const getUserData = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No hay un usuario autenticado.");
    }

    const userDocRef = doc(db, "provider", currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    } else {
      throw new Error("El documento del usuario no existe en la colección 'provider'.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);

    const cachedUser = localStorage.getItem("userData");
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    throw error;
  }
};

