import React from "react";
import "../Styles/productCard.css";
import edit from "../../../assets/svg/edit_icon.svg";
import trash from "../../../assets/svg/trash_icon.svg";
import eye from "../../../assets/svg/eye_icon.svg";
import eye_off from "../../../assets/svg/eye_off_icon.svg";
import cart from "../../../assets/svg/cart.svg";

const ProductCard = ({
  id,
  name_product,
  description,
  provider = "Coconut Bakery",
  imageUrl,
  visible,
  isClient,
  onClick,
  onDelete,
  onEdit,
  onToggleVisibility,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    // Aquí puedes agregar lógica para añadir al carrito antes de redirigir
    navigate("/transacciones", { state: { mostrarCarrito: true } }); // Redirigir al componente Carrito
  };
  return (
    <div
      className={`card-container ${!visible ? "invisible-card" : ""}`}
      onClick={onClick}
    >
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={name_product}
        className="image-product"
      />
      <div className="card-content">
        <h1 className="name-product">{name_product}</h1>
        <h2 className="provider">{provider}</h2>
        <p className="description">{description}</p>
      </div>
      {!isClient && (
        <div className="buttons-container">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
          >
            <img src={edit} alt="Editar" />
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <img src={trash} alt="Eliminar" />
          </button>
          <button
            className="visibility-button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(id, !visible);
            }}
          >
            <img src={visible ? eye : eye_off} alt="Visibilidad" />
          </button>
        </div>
      )}
      {/* {isClient && (
        <div className="client-actions">
          <button
            className="cart-button-card"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart;
            }}
          >
            Agregar
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
