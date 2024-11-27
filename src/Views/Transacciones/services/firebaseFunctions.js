import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from '../../../Firebase/config';

export const agregarProductoAlCarrito = async (products) => {
  try {
    const carritoRef = collection(db, "cart"); // Colección 'cart' en Firestore
    await addDoc(carritoRef, products); // Agregar producto al carrito
    console.log("Producto agregado al carrito");
  } catch (error) {
    console.error("Error al agregar producto al carrito: ", error);
  }
};

// Función para obtener productos del carrito
export const obtenerProductosDelCarrito = async () => {
  try {
    const carritoRef = collection(db, "products");
    const querySnapshot = await getDocs(carritoRef);
    const productos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return productos;
  } catch (error) {
    console.error("Error al obtener productos del carrito: ", error);
    return [];
  }
};

// Función para actualizar producto en el carrito
export const actualizarProductoEnCarrito = async (productoId, cantidad) => {
  try {
    const productoRef = doc(db, 'cart', productoId);
    await updateDoc(productoRef, { cant: cantidad }); // Asegúrate de que el campo se llama 'cant'
    console.log(`Cantidad actualizada en Firebase para el producto con ID: ${productoId}`);
  } catch (error) {
    console.error('Error al actualizar producto en el carrito:', error);
  }
};

// Función para eliminar producto del carrito
export const eliminarProductoDelCarrito = async (productoId) => {
  try {
    const productoRef = doc(db, "cart", productoId);
    await deleteDoc(productoRef); // Elimina el producto del carrito
    console.log("Producto eliminado del carrito");
  } catch (error) {
    console.error("Error al eliminar producto del carrito: ", error);
  }
};

export const guardarCalificacion = async (starc) => {
  try {
    await addDoc(collection(db, "califications"), {
      starc,
      date: new Date(),
    });
  } catch (error) {
    console.error("Error guardando la calificación:", error);
  }
};