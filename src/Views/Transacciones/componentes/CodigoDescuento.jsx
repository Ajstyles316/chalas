import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { jsPDF } from "jspdf"; // Importa jsPDF
import '../styles/CodigoDescuento.css'; // Importa el archivo CSS
import { CartContext } from '../context/context';

const CodigoDescuento = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0); // Valor del descuento

  const context = useContext(CartContext); // Obtén el carrito desde el contexto
  if (!context) {
    console.error('CartContext no está disponible.');
    return <p>Error cargando el contexto.</p>;
  }

  const { cart, getSubtotal } = context; // Accede al carrito y subtotal
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
        setMensaje(`Código aceptado. Descuento: ${(descuento.desc * 100).toFixed(2)}%`);
      } else {
        setMensaje('El código no es válido.');
      }
      alert('Compra Exitosa.');
    } catch (error) {
      setMensaje('Error al verificar el código.');
      console.error(error);
    }
  };

  const subtotal = getSubtotal() || 0; 
  const totalConDescuento = descuentoAplicado > 0 
    ? subtotal - subtotal * descuentoAplicado 
    : subtotal; 

    const generateOrderPDF = () => {
      try {
        if (!cart || cart.length === 0) {
          alert("No hay productos en el carrito para generar el PDF.");
          return;
        }
    
        const doc = new jsPDF();
    
        // Encabezado con fondo y texto estilizado
        doc.setFillColor(63, 81, 181); // Azul intenso
        doc.rect(0, 0, 210, 30, "F"); // Fondo del encabezado
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255); // Texto blanco
        doc.text("Resumen de Pedido", 105, 20, { align: "center" });
    
        // Información general
        let y = 40;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        doc.text("Detalles del Pedido:", 20, y);
    
        y += 10;
    
        // Línea separadora
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 5;
    
        // Tabla de productos
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setFillColor(240, 240, 240); // Gris claro para encabezado de la tabla
        doc.rect(20, y, 170, 8, "F");
        doc.text("Producto", 25, y + 5);
        doc.text("Cantidad", 105, y + 5);
        doc.text("Precio", 165, y + 5);
    
        y += 10;
    
        // Filas de productos
        doc.setFont("helvetica", "normal");
        cart.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.name_product}`, 25, y);
          doc.text(`${item.cantidad}`, 110, y, { align: "center" });
          doc.text(`${item.price.toFixed(2)} Bs`, 165, y, { align: "right" });
          y += 8;
        });
    
        // Subtotal, descuento y total con colores destacados
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(63, 81, 181); // Azul
        doc.text(`Subtotal: ${subtotal.toFixed(2)} Bs`, 20, y);
        y += 8;
        doc.setTextColor(244, 67, 54); // Rojo
        doc.text(`Descuento: ${(descuentoAplicado * 100).toFixed(2)}%`, 20, y);
        y += 8;
        doc.setTextColor(0, 150, 136); // Verde
        doc.text(`Total: ${totalConDescuento.toFixed(2)} Bs`, 20, y);
    
        // Pie de página estilizado
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(120, 120, 120);
        const fecha = new Date().toLocaleDateString();
        y = 285;
        doc.text(`Generado el: ${fecha}`, 20, y);
        doc.text("Gracias por su compra", 105, y, { align: "center" });
        doc.text("www.chalitaoe.com", 190, y, { align: "right" });
    
        // Guardar PDF
        doc.save("Reporte_pedido.pdf");
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Ocurrió un error al generar el PDF.");
      }
    };
    
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
        <p>Descuento: {(descuentoAplicado * 100).toFixed(2)}%</p>
        <p>Total: {totalConDescuento.toFixed(2)} Bs</p>
      </div>
      <button
        onClick={generateOrderPDF}
        className="codigo-descuento-boton"
      >
        Generar PDF
      </button>
    </div>
  );
};

CodigoDescuento.propTypes = {
  codigoDescuento: PropTypes.string,
};

export default CodigoDescuento;
