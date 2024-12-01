// src/services/firestoreService.js
import { collection, getDocs, getFirestore } from "firebase/firestore";
import appFirebase from '../Firebase/config';

const db = getFirestore(appFirebase)

// Función para obtener los proveedores y productos desde Firestore
export const getProviders = async () => {
  const providerCollectionRef = collection(db, "provider");
  const providerSnapshot = await getDocs(providerCollectionRef);
  const providersList = providerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return providersList;
};

export const getProviderDetails = async (providerId) => {
  const providerDocRef = collection(db, "provider").doc(providerId);
  const providerDoc = await getDoc(providerDocRef);
  if (providerDoc.exists()) {
    return providerDoc.data();
  } else {
    console.log("No such document!");
  }
};

