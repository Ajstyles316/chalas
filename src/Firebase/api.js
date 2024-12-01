import { collection, addDoc, updateDoc, doc, getDoc, setDoc, getDocs, query, where, arrayUnion, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config.js";
import { getAuth } from "firebase/auth";

export const createProduct = async (data, imageFile) => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser.uid; 
    console.log("User ID:", userId);

    // Obtener el nombre de la tienda del proveedor actual
    const profileRef = doc(db, "profileProvider", userId);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      throw new Error("No se encontró el perfil del proveedor.");
    }

    const storeName = profileSnap.data().companyName;
    console.log("Store Name:", storeName);

    let imageUrl = null;

    // Subir la imagen si se proporciona
    if (imageFile) {
      const imageRef = ref(storage, `product_images/${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Crear el producto en la colección "products"
    const docRef = await addDoc(collection(db, "products"), {
      name_product: data.name_product,
      description: data.description,
      provider: storeName, // Asignar el nombre de la tienda al campo "provider"
      visible: true,
      deleted: false,
      imageUrl: imageUrl,
      price: data.price,
      categories: data.categories || [],
    });

    console.log("Producto registrado con ID: ", docRef.id);

    // Agregar el producto a la lista del usuario en "listOfProducts"
    const userProductListRef = doc(db, "listOfProducts", userId);

    // Obtener el documento de la lista de productos del usuario, si no existe se crea
    const userProductListSnap = await getDoc(userProductListRef);
    if (userProductListSnap.exists()) {
      // Si el documento ya existe, se agrega el nuevo producto al array
      await updateDoc(userProductListRef, {
        products: arrayUnion(docRef.id), // Utilizamos arrayUnion para agregar sin duplicados
      });
    } else {
      // Si el documento no existe, creamos uno nuevo
      await setDoc(userProductListRef, {
        userId: userId,
        products: [docRef.id], // Inicializamos la lista con el primer producto
      });
    }

    return docRef.id; // Devolvemos el ID del producto creado
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
    const db = getFirestore();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Usuario no autenticado.");
    }

    const userUid = currentUser.uid;

    // Buscar el documento del usuario en listOfProducts
    const listOfProductsDocRef = doc(db, "listOfProducts", userUid);
    const listOfProductsDoc = await getDoc(listOfProductsDocRef);

    if (!listOfProductsDoc.exists()) {
      console.warn("El documento listOfProducts no existe para este usuario.");
      return []; // Retorna un array vacío si no existe el documento
    }

    const { products: productIds } = listOfProductsDoc.data();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      console.warn("El campo 'products' está vacío o no es válido.");
      return []; // Retorna un array vacío si no hay productos
    }

    // Consultar los productos en la colección "products" usando los IDs
    const productsQuery = query(
      collection(db, "products"),
      where("__name__", "in", productIds),
      where("deleted", "==",false)
    );

    const querySnapshot = await getDocs(productsQuery);

    // Mapear los datos de los productos encontrados
    const visibleProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return visibleProducts;
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    throw new Error("Error al obtener productos: " + error.message);
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