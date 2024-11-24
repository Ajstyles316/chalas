import SeleccionProducto from '../componentes/SeleccionProducto';
import { CartProvider } from '../context/context';
import Carrito from '../componentes/Carrito';
import CodigoDescuento from '../componentes/CodigoDescuento';
import Navbar from '../../Products Module/components/NavBarClient';
import '../styles/Transacciones.css';

const Transacciones = () => {
  return (
    <CartProvider>
      <Navbar />
      <div className="vista-transacciones">
        <div className="seccion-productos">
          <SeleccionProducto />
        </div>
        <div className="seccion-carrito">
          <Carrito />
        </div>
        <div className="seccion-descuento">
          <CodigoDescuento />
        </div>
      </div>
    </CartProvider>
  );
};

export default Transacciones;
