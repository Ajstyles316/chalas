import './modal.css'; // Archivo CSS para estilizar el modal
const Calificacion = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Gracias por tu compra!</h2>
        <p>Por favor, califica tu experiencia.</p>
        <div className="modal-actions">
          <button className="modal-close" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calificacion;
