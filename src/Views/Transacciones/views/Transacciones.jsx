import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carrito from '../componentes/Carrito';

import Calificacion from '../componentes/Calificacion';
import '../styles/Transacciones.css';
import { DataProvider } from '../context/context';
import CodigoDescuento from '../componentes/CodigoDescuento';

const Transacciones = () => {
  const location = useLocation(); // Captura el estado enviado por navigate
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);

  useEffect(() => {
    console.log('Estado recibido en Transacciones:', location.state);
    if (location.state?.mostrarCarrito) {
      setMostrarCarrito(true);
    }
  }, [location.state]);

  const handleConfirmarCompra = () => {
    setMostrarCarrito(false); // Oculta el carrito
    setMostrarCalificacion(true); // Muestra la calificación
  };

  return (
    <DataProvider>
      <div className="transacciones-container">
      <CodigoDescuento />
        {mostrarCarrito && !mostrarCalificacion && (
          
          <Carrito onConfirmar={handleConfirmarCompra} />
        )}
        {mostrarCalificacion && <Calificacion onConfirmar={() => alert('Calificación confirmada')} />}
      </div>
    </DataProvider>
  );
};

export default Transacciones;
