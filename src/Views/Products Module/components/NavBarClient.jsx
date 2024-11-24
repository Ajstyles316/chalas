import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../Styles/navBarClient.css";

const NavBarClient = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cerrar sesión con Firebase
      navigate("/login"); // Redirigir al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar-1">
      <div className="navbar-container-1">
        {/* Botón de Inicio */}
        <button
          className="navbar-button"
          onClick={() => navigate("/clienthome")} // Redirigir a la página de inicio
        >
          Inicio
        </button>

        {/* Logo */}
        <div className="navbar-logo">ChalitaOE</div>

        {/* Botón de Cerrar sesión */}
        <button
          className="navbar-button logout-button"
          onClick={handleLogout} // Llamar a la función de logout
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBarClient;
