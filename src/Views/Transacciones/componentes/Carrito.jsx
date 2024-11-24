import { useContext } from 'react';
import { CartContext } from '../context/context';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/config';
import '../styles/Carrito.css';

const Carrito = () => {
  const context = useContext(CartContext);

  if (!context) {
    console.error(
      'CartContext no está disponible. Asegúrate de envolver tu componente en el proveedor de CartContext.'
    );
    return <p>Hubo un error al cargar el carrito. Por favor, inténtalo de nuevo más tarde.</p>;
  }

  const { cart, removeFromCart } = context;

  const guardarEnFirebase = async () => {
    try {
      for (const producto of cart) {
        // Asignar un precio predeterminado si no existe
        const precioFinal = producto.price || 100;

        const docRef = await addDoc(collection(db, 'cart'), {
          cant: producto.cantidad,
          imgURL: producto.imageUrl,
          name_product: producto.name_product,
          price: precioFinal,
        });
        console.log(`Producto guardado con ID: ${docRef.id}`);
      }
      alert('Transacción Exitosa.');
    } catch (error) {
      console.error('Error guardando el carrito:', error);
      alert('Hubo un error al guardar el carrito.');
    }
  };

  const actualizarCantidadEnFirebase = async (id, nuevaCantidad) => {
    try {
      const productoRef = doc(db, 'cart', id);
      await updateDoc(productoRef, { cant: nuevaCantidad });
      alert('Cantidad actualizada en Firebase.');
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
      alert('Hubo un error al actualizar la cantidad.');
    }
  };

  return (
    <div className="carrito-container">
      <h2>Carrito</h2>
      {cart.length > 0 ? (
        <>
          <div className="carrito-items">
            {cart.map((producto, index) => (
              <div className="carrito-item" key={index}>
                <img src={producto.imageUrl} alt={producto.name_product || 'Producto'} />
                <div className="carrito-details">
                  <h4>{producto.name_product || 'Producto sin nombre'}</h4>
                  <p>Cantidad: {producto.cantidad || 1}</p>
                  <p>Precio: {producto.price || 100} Bs.</p>
                  <div className="carrito-actions">
                    <button className="eliminar-btn" onClick={() => removeFromCart(producto.id)}>
                      Eliminar
                    </button>
                    <button
                      className="actualizar-btn"
                      onClick={() => {
                        const nuevaCantidad = parseInt(
                          prompt(`Ingresa la nueva cantidad para ${producto.name_product}:`, producto.cantidad),
                          10
                        );
                        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                          actualizarCantidadEnFirebase(producto.id, nuevaCantidad);
                        } else {
                          alert('Por favor, introduce un número válido.');
                        }
                      }}
                    >
                      Actualizar cantidad
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carrito-save" onClick={guardarEnFirebase}>
            Aceptar
          </button>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
