import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/productCardDetailed.css";
import { RatingStars } from "./RatingStars";

const ProductCardDetailed = ({
  name_product,
  description,
  provider,
  imageUrl,
  categories = [],
}) => {
  const navigate = useNavigate(); // Hook para navegación

  const formattedCategories =
    categories.length > 0 ? categories.join(", ") : "Sin categoría";

  const handleAddToCart = () => {
    // Aquí puedes agregar lógica para añadir al carrito antes de redirigir
    navigate('/transacciones', { state: { mostrarCarrito: true } }); // Redirigir al componente Carrito
  };

  return (
    <div className="product-card-detailed">
      <div className="product-image">
        <img
          className="image-product-detailed"
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={name_product}
        />
        <div className="image-indicators">
          <span className="indicator active"></span>
          <span className="indicator"></span>
        </div>
      </div>
      <div className="product-info">
        {/* Mostrar categorías */}
        <h3 className="product-category">{formattedCategories}</h3>
        <h1 className="product-name">{name_product}</h1>
        <p className="product-supplier">{provider}</p>
        <div className="price-rating">
          <div className="product-price">$$</div>
          <RatingStars />
        </div>
        <h3 className="description-title">DESCRIPTION</h3>
        <div className="line-container">
          <hr className="line-orange" />
          <hr className="line-white" />
        </div>

        <p className="product-description">{description}</p>
        <div className="product-buttons">
          <button className="favorite-button">Añadir a favoritos</button>
          <button className="cart-button" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetailed;
