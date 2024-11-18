import React from "react";
import "../Styles/navBarClient.css";

const NavBarClient = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="navbar-button">Inicio</button>
        <div className="navbar-logo">ChalitaOE</div>
        <div className="navbar-icons">
          <span className="navbar-icon">👤</span>
          <span className="navbar-icon">🛒</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBarClient;
