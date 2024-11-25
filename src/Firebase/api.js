import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config.js";

export const createProduct = async (data, imageFile) => {
  try {
    let imageUrl = null;

    if (imageFile) {
      const imageRef = ref(storage, `product_images/${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, "products"), {
      name_product: data.name_product,
      description: data.description,
      provider: "Coconut Bakery",
      visible: true,
      deleted: false,
      imageUrl: imageUrl,
      price: data.price,
      categories: data.categories || []
    });

    console.log("Producto registrado con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    console.log("Producto actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};


export const softDeleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { deleted: true });
  } catch (e) {
    throw new Error("Error al eliminar el producto: " + e.message);
  }
};

export const getVisibleProducts = async () => {
  try {
    const q = query(
      collection(db, "products"),
      where("deleted", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (e) {
    throw new Error("Error al obtener los productos: " + e.message);
  }
};

export const getSupplierData = async (supplierId) => {
  try {
    // Obtener datos del proveedor
    const supplierRef = doc(db, "provider", supplierId);
    const supplierSnap = await getDoc(supplierRef);
    const supplierData = supplierSnap.exists() ? supplierSnap.data() : null;

    // Obtener productos visibles del proveedor
    const productsQuery = query(
      collection(db, "products"),
      where("deleted", "==", false),
      where("supplierId", "==", supplierId)
    );
    const productsSnapshot = await getDocs(productsQuery);
    const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return { supplierData, products: productsList };
  } catch (error) {
    throw new Error("Error al obtener los datos del proveedor y productos: " + error.message);
  }
  
};

const uploadImage = async (imageFile, folder = "profile_images") => {
  try {
    if (!imageFile) return null;
    const imageRef = ref(storage, `${folder}/${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

// Crear un perfil de proveedor
export const createProfileProvider = async (data, imageFile) => {
  try {
    const profileImageUrl = await uploadImage(imageFile, "profile_images");

    const docRef = await addDoc(collection(db, "profileProvider"), {
      companyName: data.companyName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      zone: data.zone,
      street: data.street,
      doorNumber: data.doorNumber,
      schedule: data.schedule,
      profileImage: profileImageUrl,
    });

    console.log("Perfil creado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el perfil del proveedor:", error);
    throw error;
  }
};

// Actualizar un perfil existente
export const updateProfileProvider = async (id, updatedData, imageFile) => {
  try {
    let updatedImageUrl = updatedData.profileImage;

    if (imageFile) {
      updatedImageUrl = await uploadImage(imageFile, "profile_images");
    }

    const profileRef = doc(db, "profileProvider", id);
    await updateDoc(profileRef, { ...updatedData, profileImage: updatedImageUrl });

    console.log("Perfil actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el perfil del proveedor:", error);
    throw error;
  }
};

// Obtener perfiles visibles de proveedores
export const getVisibleProfileProviders = async () => {
  try {
    const q = query(collection(db, "profileProvider"), where("deleted", "==", false));
    const querySnapshot = await getDocs(q);
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    return profiles;
  } catch (error) {
    console.error("Error al obtener los perfiles de proveedores:", error);
    throw error;
  }
};