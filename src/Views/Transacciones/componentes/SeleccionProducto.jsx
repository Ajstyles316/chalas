import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/SeleccionProducto.css';
import { CartContext } from '../context/context';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../../Firebase/config';
import CalificarCompra from './Calificacion';


const SeleccionProducto = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosCollection = collection(db, "products");
      const snapshot = await getDocs(productosCollection);
      const productosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(productosList.filter(producto => producto.visible));
    };
    fetchProductos();
  }, []);

  const cambiarProducto = (direccion) => {
    if (productos.length === 0) return;
    if (direccion === 'next') {
      setSelectedProduct((prev) => (prev + 1) % productos.length);
    } else {
      setSelectedProduct((prev) => (prev - 1 + productos.length) % productos.length);
    }
  };

  const agregarProducto = () => {
    const productoSeleccionado = { ...productos[selectedProduct], cantidad: 1 };
    addToCart(productoSeleccionado);
  };

  const abrirCalificacion = () => {
    setMostrarCalificacion(true);
  };
  const cerrarCalificacion = () => {
    setMostrarCalificacion(false);
  };

  return (
    <div className="transacciones">
      <div className="titulo-container">
        <h2>¿Quieres escoger algún Producto?</h2>
      </div>

      {productos.length > 0 ? (
        <div className="product-selection">
          <div className="arrow-btn-container">
            <button onClick={() => cambiarProducto('prev')} className="arrow-btn">←</button>
          </div>
          <div className="product-image-container">
            <img
              src={productos[selectedProduct].imageUrl}
              alt={productos[selectedProduct].name_product}
              className="product-image"
            />
          </div>
          <div className="arrow-btn-container">
            <button onClick={() => cambiarProducto('next')} className="arrow-btn">→</button>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      )}

      {productos.length > 0 && (
        <div className="product-details">
          <div className="product-name">
            <h3>{productos[selectedProduct].name_product}</h3>
          </div>
          <div className="product-description">
            <p>{productos[selectedProduct].description}</p>
          </div>
          <div className="product-price">
          <p>Precio: Bs. {productos[selectedProduct]?.price || "No disponible"}</p>
          </div>
        </div>
      )}

      <div className="boton-container-trac">
        <button className="btn-agregar-trac" onClick={agregarProducto}>
          <span>Agregar al Carrito</span>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png"
            alt="Carrito"
            className="btn-icon"
          />
        </button>
        <button className="btn-calificar" onClick={abrirCalificacion}>
           Calificar Producto
        </button>
      </div>
      {mostrarCalificacion && (
      <div className="modal">
        <CalificarCompra
          producto={productos[selectedProduct]}
          onConfirmar={cerrarCalificacion}
        />
      </div>
    )}
    </div>
  );
};

SeleccionProducto.propTypes = {
  agregarAlCarrito: PropTypes.func,
};

export default SeleccionProducto;
