import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../context/context';
import '../styles/Carrito.css';
import CalificarCompra from './Calificacion.jsx';
import SeleccionarMetodoPago from './MetodoDePago.jsx';
import './carrito2.css';
import {
  actualizarProductoEnCarrito,
  eliminarProductoDelCarrito,
  obtenerProductosDelCarrito,
} from '../services/firebaseFunctions'; // Importa las funciones de Firebase

const Carrito = () => {
  const { cart: [productosCarrito, setCart], total: [total, setTotal], discountedTotal, discountCode } = useContext(DataContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSelectionOpen, setSelectionOpen] = useState(false);

  // Cargar productos del carrito desde Firebase al inicializar el componente
  useEffect(() => {
    const cargarCarritoDesdeFirebase = async () => {
      const productos = await obtenerProductosDelCarrito();
      setCart(productos);
      actualizarTotal(productos);
    };

    cargarCarritoDesdeFirebase();
  }, []);

  // Función para actualizar el total del carrito
  const actualizarTotal = (productos = productosCarrito) => {
    const newTotal = productos.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setTotal(newTotal);
  };

  // Actualizar producto en Firebase y el estado local
  const handleActualizarProducto = async (productoId, cantidad) => {
    if (cantidad < 1) {
      alert("La cantidad no puede ser menor que 1");
      return;
    }

    await actualizarProductoEnCarrito(productoId, cantidad);
    setCart((prevCart) =>
      prevCart.map((producto) =>
        producto.id === productoId ? { ...producto, cantidad } : producto
      )
    );
    actualizarTotal();
  };

  // Eliminar producto en Firebase y el estado local
  const handleEliminarProducto = async (productoId) => {
    await eliminarProductoDelCarrito(productoId);
    const nuevoCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
    setCart(nuevoCarrito);
    actualizarTotal(nuevoCarrito);
  };

  // Agregar o actualizar cantidad del producto localmente y en Firebase
  const handleCantidadChange = async (e, productoId) => {
    const cantidad = parseInt(e.target.value, 10);
    const producto = productosCarrito.find((p) => p.id === productoId);

    if (producto) {
      setCart((prevCart) =>
        prevCart.map((producto) =>
          producto.id === productoId ? { ...producto, cantidad: isNaN(cantidad) ? 1 : cantidad } : producto
        )
      );
      actualizarTotal();
      await actualizarProductoEnCarrito(productoId, isNaN(cantidad) ? 1 : cantidad);
    }
  };

  // Abrir la selección de métodos de pago
  const handleMetodoPago = () => {
    setSelectionOpen(true);
  };

  return (
    <div className="carrito-container">
      <img src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png" alt="Carrito" />
      <div className="carrito-items-container">
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto, index) => (
            <div key={producto.id || index} className="carrito-item">
              <img src={producto.imagen} alt={producto.name} className="carrito-imagen" />
              <div className="carrito-precio">
                <p>{producto.name}</p>
                <input
                  type="number"
                  min="1"
                  value={producto.cantidad}
                  onChange={(e) => handleCantidadChange(e, producto.id)}
                  className="input-cantidad"
                />
              </div>
              <div className="carrito-botones">
                <button
                  onClick={() => handleActualizarProducto(producto.id, producto.cantidad)}
                  className="btn-actualizar"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => handleEliminarProducto(producto.id)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
      <div className="carrito-total">
        {discountCode ? (
          <>
            <h3>Total Original: {total} Bs.</h3>
            <h3>Código de Descuento Aplicado: {discountCode}</h3>
            <h3>Total con Descuento: {discountedTotal} Bs.</h3>
          </>
        ) : (
          <h3>Total: {total} Bs.</h3>
        )}
      </div>
      <button className="btn-aceptar" onClick={handleMetodoPago}>
        Aceptar
      </button>
      {isSelectionOpen && (
        <div className="modal-overlay-medio">
          <div className="modal-content-medio">
            <SeleccionarMetodoPago carrito={productosCarrito} />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CalificarCompra carrito={productosCarrito} onConfirmar={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

Carrito.propTypes = {
  onConfirmar: PropTypes.func.isRequired,
};

export default Carrito;
