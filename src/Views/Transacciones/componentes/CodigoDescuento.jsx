import { useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import '../styles/CodigoDescuento.css'; // Importa el archivo CSS
import { useCart } from '../context/context';
const CodigoDescuento = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0); // Valor del descuento
  const { getSubtotal } = useCart();
  const db = getFirestore();

  const verificarCodigo = async () => {
    setMensaje(''); // Reiniciar el mensaje

    if (!codigo.trim()) {
      setMensaje('Por favor, ingresa un código.');
      return;
    }

    try {
      const q = query(collection(db, "descount"), where("code", "==", codigo));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMensaje('Código inválido o no existe.');
        return;
      }

      const descuento = querySnapshot.docs[0].data();

      if (descuento.valid) {
        setDescuentoAplicado(descuento.desc); // Guardar el descuento
        setMensaje(`Código aceptado. Descuento: ${descuento.desc * 75}%`);
      } else {
        setMensaje('El código no es válido.');
      }
    } catch (error) {
      setMensaje('Error al verificar el código.');
      console.error(error);
    }
  };

  const subtotal = getSubtotal(); // Obtener subtotal del carrito
  const totalConDescuento = subtotal - subtotal * descuentoAplicado; // Calcular el total

  return (
    <div className="codigo-descuento-container">
      <h2 className="codigo-descuento-titulo">Código de Descuento</h2>
      <div className="codigo-descuento-input-container">
        <input
          type="text"
          className="codigo-descuento-input"
          placeholder="Ingresa tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
      <button
        onClick={verificarCodigo}
        className="codigo-descuento-boton"
      >
        Verificar
      </button>
      {mensaje && (
        <p
          className={`codigo-descuento-mensaje ${
            mensaje.includes('aceptado') ? 'exito' : 'error'
          }`}
        >
          {mensaje}
        </p>
      )}
      <div className="codigo-descuento-resumen">
        <p>Subtotal: {subtotal.toFixed(2)} Bs</p>
        <p>Descuento: {descuentoAplicado * 75}%</p>
        <p>Total: {totalConDescuento.toFixed(2)} Bs</p>
      </div>
    </div>
  );
};

export default CodigoDescuento;
