import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Inicialización de Firebase (asegúrate de importar correctamente tu configuración de Firebase)
import { appFirebase } from "./config"; // Ajusta la ruta según tu estructura a

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const getUserData = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No hay un usuario autenticado.");
    }

    // Usar el UID para buscar en la colección "provider"
    const userDocRef = doc(db, "provider", currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    console.log(userDocSnap)
    console.log(userDocRef)

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Guardar los datos en localStorage para persistencia
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    } else {
      throw new Error("El documento del usuario no existe en la colección 'provider'.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);

    // Si ocurre un error, intentar cargar desde localStorage
    const cachedUser = localStorage.getItem("userData");
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    throw error; // Relanzar el error si no se puede obtener ni de Firestore ni de localStorage
  }
};
