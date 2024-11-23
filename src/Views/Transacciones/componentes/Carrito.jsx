import { useContext } from 'react';
import { DataContext } from '../context/context.jsx';
import "../styles/Carrito.css"

const Carrito = () => {
    const { carrito: [productos, setProductos], total: [total] } = useContext(DataContext);

    const handleEliminarProducto = (id) => {
        const nuevosProductos = productos.filter((producto) => producto.id !== id);
        setProductos(nuevosProductos);
    };

    return (
        <div className="carrito-container">
            <h2 className="carrito-titulo">Carrito de Compras</h2>
            {productos.length > 0 ? (
                productos.map((producto) => (
                    <div className="carrito-item" key={producto.id}>
                        <img 
                            src={producto.imagen} 
                            alt={producto.nombre} 
                            className="carrito-imagen" 
                        />
                        <div className="carrito-precio">
                            <p className="carrito-nombre">{producto.nombre}</p>
                            <p className="carrito-costo">Precio: ${producto.precio}</p>
                            <input
                                type="number"
                                className="input-cantidad"
                                defaultValue={producto.cantidad}
                                min="1"
                                onChange={(e) => {
                                    const nuevosProductos = productos.map((prod) => {
                                        if (prod.id === producto.id) {
                                            prod.cantidad = parseInt(e.target.value);
                                        }
                                        return prod;
                                    });
                                    setProductos(nuevosProductos);
                                }}
                            />
                        </div>
                        <button
                            className="btn-eliminar"
                            onClick={() => handleEliminarProducto(producto.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))
            ) : (
                <p className="carrito-vacio">Tu carrito está vacío.</p>
            )}
            <div className="carrito-total">
                <p className="total-texto">Total: ${total}</p>
            </div>
            <div className="codigo-y-aceptar">
                <button className="btn-codigo">Código de Descuento</button>
                <button className="btn-aceptar">Aceptar</button>
            </div>
        </div>
    );
};

export default Carrito;
