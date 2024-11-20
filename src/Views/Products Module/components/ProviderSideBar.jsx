import React, { useState } from "react";
import ProductAdministration from "../views/ProductAdministration"; // Importa tu componente
import "../Styles/providerSideBar.css"; // CSS del ProviderSideBar
import TopBar from "./TopBar"; // Importa el TopBar
import LogoApp from "../../../assets/img/appLogo.jpeg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const auth = getAuth();


const ProviderSideBar = () => {

  const navigate = useNavigate();


  const [activeView, setActiveView] = useState("productos");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handdleSingOut = async () => {
    try {
      await signOut(auth);
      navigate('/')
    } catch (err) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar sesión");
    }
  }

  return (
    <div className="admin-container">
      <TopBar onToggleSidebar={toggleSidebar} /> {/* Barra superior */}
      <div className="admin-content">
        {isSidebarVisible && (
          <aside className="sidebar">
            <div className="sidebar-header">
              <img src={LogoApp} alt="Logo de la aplicación" />
              <h2>Panel de administración de productos</h2>
            </div>
            <ul className="sidebar-menu">
              <li
                className={activeView === "productos" ? "active" : ""}
                onClick={() => setActiveView("productos")}
              >
                Productos
              </li>
              <li
                className={activeView === "opcion2" ? "active" : ""}
                onClick={() => setActiveView("opcion2")}
              >
                Opción 2
              </li>
              <li
                className={activeView === "opcion3" ? "active" : ""}
                onClick={() => setActiveView("opcion3")}
              >
                Opción 3
              </li>
              <li
                className={activeView === "opcion4" ? "active" : ""}
                onClick={() => setActiveView("opcion4")}
              >
                Opción 4
              </li>
            </ul>
            <button onClick={handdleSingOut} className="">Cerrar Sesión</button>
          </aside>
        )}
        <main className="content">
          {activeView === "productos" && <ProductAdministration />}
          {activeView === "opcion2" && <div>Contenido de Opción 2</div>}
          {activeView === "opcion3" && <div>Contenido de Opción 3</div>}
          {activeView === "opcion4" && <div>Contenido de Opción 4</div>}
        </main>
      </div>
    </div>
  );
};

export default ProviderSideBar;
