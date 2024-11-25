import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../Styles/navBarClient.css";

const NavBarClient = () => {
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
    <nav className="navbar-1">
      <div className="navbar-container-1">
        <button
          className="navbar-button"
          onClick={() => navigate("/clienthome")}
        >
          Inicio
        </button>

        <div className="navbar-logo">ChalitaOE</div>

        <button className="navbar-button logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBarClient;
