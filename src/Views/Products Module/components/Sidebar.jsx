import React, { useState } from "react";
import ProductAdministration from "../views/ProductAdministration";
import "../Styles/sidebar.css";
import Navbar from "./Navbar"; // Reemplazado TopBar por Navbar
import LogoApp from "../../../assets/img/appLogo.jpeg";
import Footer from "../../Client/components/Footer";

const Sidebar = () => {
  const [activeView, setActiveView] = useState("productos");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="admin-container">
      <Navbar onToggleSidebar={toggleSidebar} />{" "}
      {/* Pasamos la función al Navbar */}
      <div
        className={`admin-content ${
          isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"
        }`}
      >
        {isSidebarVisible && (
          <aside className="sidebar">
            <ul className="sidebar-menu">
              <li
                className={activeView === "productos" ? "active" : ""}
                onClick={() => setActiveView("productos")}
              >
                Productos
              </li>
              <li
                className={activeView === "Perfil" ? "active" : ""}
                onClick={() => setActiveView("Perfil")}
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
          </aside>
        )}
        <main className="content">
          {activeView === "productos" && <ProductAdministration />}
          {activeView === "opcion2" && <div>Contenido de Opción 2</div>}
          {activeView === "opcion3" && <div>Contenido de Opción 3</div>}
          {activeView === "opcion4" && <div>Contenido de Opción 4</div>}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
