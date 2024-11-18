import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from '../../../Firebase/config';

export const agregarProductoAlCarrito = async (producto) => {
  try {
    await addDoc(collection(db, "cart"), {
      cant: producto.cant,
      id: producto.id,
      img: producto.img,
      name: producto.name,
      price: producto.price,
    });
    console.log("Producto agregado correctamente al carrito");
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};

// **2. Actualizar un producto en el carrito**
export const actualizarProductoEnCarrito = async (productoId, nuevaCantidad) => {
  const productRef = doc(db, "cart", productoId.toString());
  try {
    await updateDoc(productRef, {
      cantidad: nuevaCantidad, // Actualiza solo la cantidad
    });
    console.log("Producto actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

// **3. Eliminar un producto del carrito**
export const eliminarProductoDelCarrito = async (productoId) => {
  try {
    await deleteDoc(doc(db, "cart", productoId.toString()));
    console.log("Producto eliminado correctamente del carrito");
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
  }
};

// **4. Obtener todos los productos del carrito**
export const obtenerProductosDelCarrito = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cart"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID del documento en Firestore
      ...doc.data(), // Datos del producto
    }));
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    return [];
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