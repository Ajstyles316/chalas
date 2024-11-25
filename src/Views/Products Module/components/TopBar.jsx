import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../Styles/topBar.css";

const TopBar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="top-bar">
      {/* Botón de menú (tres rayas) */}
      <div className="menu-icon" onClick={onToggleSidebar}>
        &#9776;
      </div>

      <div className="top-bar-left">
        <button
          className="top-bar-button"
          onClick={() => navigate("/clienthome")} // Redirigir a la página de inicio
        >
          Inicio
        </button>
      </div>

      {/* Título del panel */}
      <div className="top-bar-title">
        <h1>Panel de administración del proveedor</h1>
        <span>Productos</span>
      </div>

      {/* Información del proveedor y botón de Cerrar sesión */}
      <div className="top-bar-right">
        <div className="provider-information">
          <span className="user-name">Nombre del proveedor</span>
          <span className="user-role">Proveedor</span>
        </div>
        {/* Botón de Cerrar sesión */}
        <button className="top-bar-button logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default TopBar;
