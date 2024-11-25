import React, { useState } from "react";
import "../Styles/supplierProfile.css";
import profileImage from "../assets_test/Enterprise_logo.png";
import { RatingStars } from "../components/RatingStars";
import SupplierProducts from "../components/SupplierProducts";
import { useNavigate } from "react-router-dom";
import ProductCardDetailed from "../components/ProductCardDetailed";
import { useUser } from "../../../Firebase/UserContext";
import Navbar from "../components/Navbar";

import { Pencil } from "lucide-react";

const SupplierProfile = () => {
  const { user, loading, error } = useUser();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No se encontró un usuario autenticado.</div>;
  }

  return (
    <div className="profile-provider-page">
      <Navbar />
      <div className="profile-provider-container">
        <div className="banner-profile-provider">
          <button onClick={handleEditProfile} className="provider-edit-button">
            <Pencil />
            Editar Perfil
          </button>
        </div>
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
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
              <p>WhatsApp: {user.phone}</p>
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
      {selectedProduct && (
        <div className="overlay-card" onClick={handleClose}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <ProductCardDetailed {...selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierProfile;
