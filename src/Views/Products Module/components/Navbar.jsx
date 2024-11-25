import React from "react";
import "../Styles/Navbar.css";

import Logo from "../../../assets/img/llama_bufanda.png";
import Profile from "./Profile";
import { Menu } from "lucide-react";
const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="navbar-container-new">
      <div className="navbar-right-side">
        <Menu onClick={onToggleSidebar} />{" "}
        {/* Al hacer clic en el ícono de Menu, se llama a onToggleSidebar */}
        <a href="/" className="logo-new">
          <img src={Logo} alt="" className="logo-image-new" />
        </a>
      </div>
      <nav className="navbar-new">
        <a href="/">Inicio</a>
        <a href="/DashboardProvider">Dashboard</a>
        <a href="/">Notificaciones</a>
        <Profile />
      </nav>
    </header>
  );
};

export default Navbar;
