import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/productCardDetailed.css";
import { RatingStars } from "./RatingStars";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ProductCardDetailed = ({
  name_product,
  description,
  provider,
  provider_id,
  imageUrl,
  categories = [],
}) => {
  const { user } = useAuth();
  console.log({ user });

  const navigate = useNavigate();

  const handleProviderClick = (e) => {
    e.stopPropagation();
    navigate(`/supplier-profile/${provider_id}`);
  };

  const formattedCategories =
    categories.length > 0 ? categories.join(", ") : "Sin categoría";

  const handleAddToCart = () => {
    navigate("/transacciones", { state: { mostrarCarrito: true } });
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
        <h3 className="product-category">{formattedCategories}</h3>
        <h1 className="product-name">{name_product}</h1>
        <p className="product-supplier" onClick={handleProviderClick}>
          {provider}
        </p>
        <div className="price-rating">
          <div className="product-price">$$</div>
          <RatingStars />
        </div>
        <h3 className="description-title">DESCRIPTION</h3>
        <div className="line-container">
          <hr className="line-orange" />
          <hr className="line-white" />
        </div>

        <p className="product-description-detailed">{description}</p>
        <div className="product-buttons">
          <button className="cart-button" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetailed;
