import React, { useState, useEffect } from "react";
import "../Styles/supplierProfile.css";
import profileImage from "../assets_test/Enterprise_logo.png";
import { RatingStars } from "../components/RatingStars";
import SupplierProducts from "../components/SupplierProducts";
import { useNavigate } from "react-router-dom";
import ProductCardDetailed from "../components/ProductCardDetailed";
import { useUser } from "../../../Firebase/UserContext";
import Navbar from "../components/Navbar";
import { Pencil } from "lucide-react";
import { db } from "../../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Asegúrate de importar esto para obtener el auth

const SupplierProfile = () => {
  const { user, loading, error } = useUser();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Función para obtener el uid usando getAuth
  const getUserId = () => {
    const auth = getAuth();
    return auth.currentUser ? auth.currentUser.uid : null;
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = getUserId(); // Usamos el uid del usuario autenticado
      if (userId) {
        try {
          const docRef = doc(db, "profileProvider", userId); // Utilizamos el uid para obtener los datos
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log("No se encontraron datos de perfil");
          }
        } catch (error) {
          console.error("Error al cargar los datos del perfil:", error);
        }
      }
    };
    fetchProfileData();
  }, [user]);

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
              <img
                src={profileImage}
                alt="Imagen del perfil"
                className="profile-picture"
              />
            </div>
            <div className="profile-details">
              <div className="supplier-name">
                {profileData ? profileData.companyName : "Cargando..."}
              </div>
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
                {profileData
                  ? `${profileData.firstName} ${profileData.lastName}`
                  : "Cargando..."}
              </p>
              <p>{profileData ? profileData.email : "Cargando..."}</p>
              <p>WhatsApp: {profileData ? profileData.phone : "Cargando..."}</p>
            </div>
            <div className="address-column">
              <h3>Dirección</h3>
              <p>{profileData ? profileData.street : "Cargando..."}</p>
              <p>{profileData ? profileData.zone : "Cargando..."}</p>
              <p>{profileData ? profileData.doorNumber : "Cargando..."}</p>
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
