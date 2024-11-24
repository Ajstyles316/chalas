import { useContext, useState } from 'react';
import { CartContext } from '../context/context';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/config';
import '../styles/Carrito.css';
import CalificarCompra from './Calificacion';

const Carrito = () => {
  const context = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error guardando el carrito:', error);
      alert('Hubo un error al guardar el carrito.');
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
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
      <img src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png" alt="Carrito" />
      {cart.length > 0 ? (
        <>
          <div className="carrito-items">
            {cart.map((producto, index) => (
              <div className="carrito-item" key={index}>
                <img src={producto.imageUrl} alt={producto.name_product || 'Producto'} />
                <div className="carrito-details">
                  <h4>{producto.name_product || 'Producto sin nombre'}</h4>
                  <p>Cantidad:</p>
                {/* Input para modificar la cantidad */}
                <input
                  type="number"
                  min="1"
                  value={producto.cantidad}
                  onChange={(e) => {
                    // Actualiza el valor de la cantidad localmente
                    const nuevaCantidad = parseInt(e.target.value, 10);
                    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                      producto.cantidad = nuevaCantidad; // Modifica el estado local
                    } else {
                      alert('Por favor, introduce un número válido.');
                    }
                  }}
                />
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
          {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CalificarCompra carrito={[]} onConfirmar={cerrarModal} />
          </div>
        </div>
      )}
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
