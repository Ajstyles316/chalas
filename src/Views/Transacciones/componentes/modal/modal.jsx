import PropTypes from 'prop-types';
import './modal.css'; // Archivo CSS para estilizar el modal

const Calificacion = ({ onConfirmar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Gracias por tu compra!</h2>
        <p>Por favor, califica tu experiencia.</p>
        <div className="modal-actions">
          <button className="modal-close" onClick={onConfirmar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de propiedades
Calificacion.propTypes = {
  onConfirmar: PropTypes.func.isRequired, // onConfirmar debe ser una función
};

export default Calificacion;
