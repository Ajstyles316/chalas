import { useState, useContext } from "react";
import descuento from "../imagenes/image 16.png";
import Modal from "../componentes/modal/modal";
import { DataContext } from "../context/context";
import '../styles/Transacciones.css'
const CodigoDescuento = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { applyDiscount } = useContext(DataContext);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyDiscount = (codigo) => {
    console.log("Código de descuento aplicado:", codigo);
    applyDiscount(codigo); // Función para aplicar el descuento
    handleCloseModal();
  };

  return (
    <div className="codigo-descuento-container">
      {/* Botón para abrir el modal de código de descuento */}
      <div className="codigo-descuento-btn-container">
        <button className="codigoDescuento" onClick={handleOpenModal}>
          <img src={descuento} alt="Ícono de Descuento" />
          Código de Descuento
        </button>
      </div>

      {/* Modal para ingresar el código de descuento */}
      <div className="codigo-descuento-modal-container">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleApplyDiscount}
        />
      </div>
    </div>
  );
};

export default CodigoDescuento;
