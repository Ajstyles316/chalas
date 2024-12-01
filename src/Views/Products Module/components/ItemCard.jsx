import React, { useState } from "react";
import "../Styles/itemCard.css";
import { useNavigate } from "react-router-dom";
import ProductCardDetailed from "./ProductCardDetailed";

const ItemCard = ({
  imageUrl,
  name_product,
  provider,
  provider_id,
  description,
  categories,
}) => {
  const navigate = useNavigate();

  const handleProviderClick = (e) => {
    e.stopPropagation();
    navigate(`/supplier-profile/${provider_id}`);
  };
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setShowDetail(false);
  };
  return (
    <>
      <div className="item-card-container" onClick={handleCardClick}>
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={name_product}
          className="item-card-image"
        />
        <div className="item-information">
          <h1 className="item-name">{name_product}</h1>
          <h2 className="item-provider" onClick={handleProviderClick}>
            {provider}
          </h2>
          <p className="item-description">{description}</p>
        </div>
      </div>
      {showDetail && (
        <div className="overlay-item" onClick={handleCloseModal}>
          <div className="modal-item" onClick={(e) => e.stopPropagation()}>
            <ProductCardDetailed
              name_product={name_product}
              description={description}
              provider={provider}
              provider_id={provider_id}
              imageUrl={imageUrl}
              categories={categories}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
