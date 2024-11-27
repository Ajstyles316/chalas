import { useContext, useState } from 'react';
import { CartContext } from '../context/context';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/config';
import '../styles/Carrito.css';
import CalificarCompra from './Calificacion';

const Carrito = () => {
  const context = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codigoDescuento, setCodigoDescuento] = useState(''); // Estado para mostrar el código generado

  if (!context) {
    console.error(
      'CartContext no está disponible. Asegúrate de envolver tu componente en el proveedor de CartContext.'
    );
    return <p>Hubo un error al cargar el carrito. Por favor, inténtalo de nuevo más tarde.</p>;
  }

  const { cart, removeFromCart, setCart } = context;

  // Generar un código de descuento aleatorio y agregarlo a Firebase
  const generarCodigoDescuento = async () => {
    const codigo = 'DESC' + Math.random().toString(36).substring(2, 8).toUpperCase(); // Código aleatorio
    const descuento = Math.random() * 0.2; // Genera un porcentaje de descuento entre 0 y 50%

    try {
      await addDoc(collection(db, 'descount'), {
        code: codigo,
        desc: descuento,
        valid: true,
      });
      setCodigoDescuento(codigo); // Guarda el código generado en el estado
    } catch (error) {
      console.error('Error guardando el código de descuento:', error);
    }
  };

  const guardarEnFirebase = async () => {
    try {
      for (const producto of cart) {
        // Asignar un precio predeterminado si no existe
        const precioFinal = producto.price || 75;

        const docRef = await addDoc(collection(db, 'cart'), {
          cant: producto.cantidad,
          imgURL: producto.imageUrl,
          name_product: producto.name_product,
          price: precioFinal,
        });
        console.log(`Producto guardado con ID: ${docRef.id}`);
      }
      alert('Transacción en el Carrito.');
      await generarCodigoDescuento(); // Genera el código después de aceptar la transacción
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error guardando el carrito:', error);
      alert('Hubo un error al guardar el carrito.');
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  const actualizarCantidad = async (productoId, nuevaCantidad) => {
    try {
      // Actualiza en Firebase y el carrito local
      setCart((prevCart) =>
        prevCart.map((producto) =>
          producto.id === productoId
            ? { ...producto, cantidad: nuevaCantidad }
            : producto
        )
      );
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
                  <input
                    type="number"
                    min="1"
                    value={producto.cantidad}
                    onChange={(e) => {
                      const nuevaCantidad = parseInt(e.target.value, 10);
                      if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                        actualizarCantidad(producto.id, nuevaCantidad);
                      } else {
                        alert('Por favor, introduce un número válido.');
                      }
                    }}
                  />
                  <p>Precio: {producto.price || 75} Bs.</p>
                  <div className="carrito-actions">
                    <button className="eliminar-btn" onClick={() => removeFromCart(producto.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carrito-save" onClick={guardarEnFirebase}>
            Aceptar
          </button>
          <div className="codigo-descuento-container">
            {codigoDescuento && (
              <p>
                Tu código de descuento es: <strong>{codigoDescuento}</strong>
              </p>
            )}
          </div>
        </>
      ) : (
        <p>El carrito está en espera.</p>
      )}
    </div>
  );
};

export default Carrito;
