import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/supplierProfile.css";
import profileImage from "../assets_test/Enterprise_logo.png";
import { RatingStars } from "../components/RatingStars";
import Navbar from "../components/Navbar";
import { db } from "../../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Footer from "../../Client/components/Footer";
import ProductList from "../components/ProductList";
import ProductCardDetailed from "../components/ProductCardDetailed";
import SupplierProducts from "../components/SupplierProducts";
import Header from "../../Client/components/Header";

const ClientProviderView = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = id;
      setLoading(true);
      console.log("User ID:", userId);

      if (userId) {
        try {
          const docRef = doc(db, "profileProvider", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData(data); // Actualiza el estado
            console.log("Perfil cargado:", data); // Verifica los datos cargados
          } else {
            console.log("No se encontraron datos de perfil");
          }
        } catch (error) {
          console.error("Error al cargar los datos del perfil:", error);
        } finally {
          setLoading(false); // Cambia el estado de loading a false
        }
      } else {
        setLoading(false); // Cambia el estado de loading a false si no hay ID
      }
    };

    fetchProfileData();
  }, [id]); // Dependencia en el 'id', se ejecutará cada vez que cambie

  if (!id) {
    return <div>No se encontró un usuario autenticado o ID de proveedor.</div>;
  }

  if (loading) {
    return <div>Cargando...</div>; // Mostrar mientras se carga
  }

  return (
    <div className="profile-provider-page">
      <div className="profile-provider-container">
        <div className="banner-profile-provider"></div>
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
      <Footer />
    </div>
  );
};

export default ClientProviderView;
