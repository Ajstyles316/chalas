import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, FilterIcon } from 'lucide-react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import logo from '../../../assets/img/appLogo.jpeg';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClientOpen, setIsMenuClientOpen] = useState(false);
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);
  const menuRef = useRef(null);


  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const navigateToHome = () => {
    navigate('/clienthome'); // Cambia '/cliente' a la ruta principal de tu cliente
  };

  const toggleMenuClient = () => {
    setIsMenuClientOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setIsLogoutConfirmationVisible(false); // Oculta la confirmación
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión');
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setIsMenuClientOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-32 h-32" onClick={navigateToHome}/>
          <div className="logollamita">
            <h1 className="text-3xl font-bold text-gray-800">ChalitaOE</h1>
            <p className="text-sm text-gray-600 mt-1">Bienvenido Cliente</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-2xl mx-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Botones del lado derecho */}
        <div className="flex items-center gap-6">
          {/* Botón de carrito */}
          <button
            className="flex flex-col items-center text-gray-600 hover:text-[#8B0000] transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Carrito</span>
          </button>

          {/* Botón de filtros */}
          <div className="relative">
            <button
              className="flex flex-col items-center text-gray-600 hover:text-[#8B0000] transition-colors"
              onClick={toggleMenu}
            >
              <FilterIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Filtros</span>
            </button>
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              >
                {/* Aquí puedes incluir las categorías o filtros dinámicos */}
                <ul className="p-2">
                  <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">Bebida3</li>
                  <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">Comida3</li>
                  <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">Decoracion3</li>
                  <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">Musica1</li>
                  <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"></li>
                </ul>
              </div>
            )}
          </div>

          {/* Menú de perfil */}
          <div className="relative">
          <svg
                onClick={toggleMenuClient} // Al hacer clic se alterna el menú del cliente
                className="w-12 h-12 text-white cursor-pointer rounded-full border-2 border-gray-300 p-2 hover:scale-105 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" fill="#FF5722" /> {/* Fondo naranja */}
                <circle cx="12" cy="8" r="4" fill="#FFC107" /> {/* Cabeza amarilla */}
                <path d="M12 12c2 2 2 6 2 6H10s0-4 2-6z" fill="#FF5722" /> {/* Cuerpo */}
              </svg>
            {isMenuClientOpen && (
              <div
                ref={menuRef}
                className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-3"
              >
                <ul className="text-gray-700">
                  <li
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => alert('Ver perfil')}
                  >
                    <FiUser className="text-xl text-gray-600" /> Ver perfil
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="text-xl text-gray-600" /> Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
