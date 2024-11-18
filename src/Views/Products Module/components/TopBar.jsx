import React from "react";
import "../Styles/topBar.css";

const TopBar = ({ onToggleSidebar }) => {
  return (
    <header className="top-bar">
      <div className="menu-icon" onClick={onToggleSidebar}>
        &#9776; {/* Icono de tres rayas */}
      </div>
      <div className="top-bar-title">
        <h1>Panel de administración del proveedor</h1>
        <span>Productos</span>
      </div>
      <div className="top-bar-right">
        <div className="provider-information">
          <span className="user-name">Nombre del proveedor</span>
          <span className="user-role">Proveedor</span>
        </div>
        <div className="user-icon">👤</div>{" "}
        {/* Puedes cambiarlo por un ícono SVG */}
      </div>
    </header>
  );
};

export default TopBar;
