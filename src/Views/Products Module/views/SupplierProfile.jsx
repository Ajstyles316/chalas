import React, { useState } from "react";
import "../Styles/supplierProfile.css";
import profileImage from "../assets_test/Enterprise_logo.png";
import { RatingStars } from "../components/RatingStars";
import SupplierProducts from "../components/SupplierProducts";
import ProductCardDetailed from "../components/ProductCardDetailed";

const SupplierProfile = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="banner-profile"></div>
        <div className="content-supplier">
          <div className="profile-info-container">
            <div className="profile-picture-container">
              <img src={profileImage} alt="" className="profile-picture" />
            </div>
            <div className="profile-details">
              <div className="supplier-name">Coconut bakery</div>
              <div className="rating">
                <RatingStars />
                <span className="rating-number">4.0</span>
              </div>
            </div>
          </div>
          <hr className="divider-line" />
          <div className="contact-info">
            <div className="contact-column">
              <h3>Contactos</h3>
              <p>Mónica Geller</p>
              <p>monicageller@gmail.com</p>
              <p>WhatsApp: +59176217335</p>
            </div>
            <div className="address-column">
              <h3>Dirección</h3>
              <p>Sopocachi</p>
              <p>Calle Miguel de Cervantes</p>
              <p>Nro. 2777</p>
            </div>
            <div className="hours-column">
              <h3>Horarios de atención</h3>
              <p>Lun. - Vie.: 8h - 21h</p>
              <p>Sáb.: 9h - 22h</p>
              <p>Dom.: 9h - 22h</p>
            </div>
          </div>
        </div>
      </div>

      <SupplierProducts onCardClick={handleCardClick} />
      {}
      {selectedProduct && (
        <div className="overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProductCardDetailed {...selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierProfile;
