import React from "react";
import Logo from "../../../assets/img/appLogo.jpeg";
import Profile from "./Profile";
import { Menu } from "lucide-react";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="flex bg-white px-3 h-16 xl:h-20 2xl:h-24 shadow-md w-full sm:px-10 xl:px-40 items-center fixed z-10 justify-between">
      <div className="flex items-center">
        <Menu className="cursor-pointer" onClick={onToggleSidebar} />
        <a href="/" className="ml-10 w-15 h-15">
          <img src={Logo} alt="Logo" className="w-20 h-20 " />
        </a>
      </div>
      <nav className="flex">
        <a href="/clienthome" className="mr-9 flex items-center">
          Inicio
        </a>
        <a href="/DashboardProvider" className="mr-9 flex items-center">
          Productos
        </a>
        <Profile />
      </nav>
    </header>
  );
};

export default Navbar;
