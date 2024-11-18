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
      where("supplierId", "==", supplierId) // Asegúrate de que los productos tengan esta propiedad
    );
    const productsSnapshot = await getDocs(productsQuery);
    const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return { supplierData, products: productsList };
  } catch (error) {
    throw new Error("Error al obtener los datos del proveedor y productos: " + error.message);
  }
};