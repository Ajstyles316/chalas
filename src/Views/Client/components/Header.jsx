import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Percent, User, Search, MessageCircleDashed, FilterIcon } from 'lucide-react';
import { Hits, Menu, SearchBox } from 'react-instantsearch';
import lamaLogo from '../../../assets/img/appLogo.jpeg'
import { useNavigate } from 'react-router';

function Hit({ hit }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 border rounded-lg p-3 hover:shadow-md transition bg-white-50">
        <div className="flex-1">
          <h3 className="font-bold text-gray-600">{hit.name_product}</h3>
          <p className="text-sm text-gray-500">{hit.description}</p>
        </div>
      </div>
    </div>
  );
}
const Header = () => {
  const [hasText, setHasText] = useState(false);
  const [showHits, setShowHits] = useState(false); // Estado para controlar si los hits se muestran
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate=useNavigate();
  const handleAddToCart = () => {
    navigate("/transacciones", { state: { mostrarCarrito: true } });
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setShowHits(false); // Oculta los hits al presionar Enter
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleInputChange = (event) => {
    setShowHits(true); // Oculta los hits al presionar Enter
    setHasText(event.target.value.trim().length > 0);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowHits(false); // Oculta los hits al presionar Enter
    }
  };

  const handleBlur = () => {
    setShowHits(false); // Oculta los hits cuando se hace clic fuera del SearchBox
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <div className="w-32 h-32">
              <img
                src={lamaLogo}
                alt="ChalitaOE Logo"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800">ChalitaOE</h1>
              <p className="text-sm text-gray-600 mt-1">Bienvenido Cliente</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <SearchBox
                placeholder="Buscar productos..."
                classNames={{
                  input: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent",
                  //submitIcon: "pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500",
                  //submitIcon: "h-8 w-8 absolute right-2 top-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition",
                  submitIcon: `h-8 w-8 absolute right-1 top-2 bg-white-500 text-white p-2 rounded-lg hover:bg-gray-600 transition ${hasText ? "hidden" : ""
                    }`,
                  resetIcon: `h-8 w-8 absolute right-1 top-2 bg-white-500 text-white p-2 rounded-lg hover:bg-gray-600 transition ${hasText ? "hidden" : ""
                    }`,
                  loadingIcon: "h-8 w-8 absolute right-2 top-2 bg-white-500 text-white p-2 rounded-lg hover:bg-gray-600 transition",

                }}
                onInput={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {showHits && <Hits hitComponent={Hit} />}
              </div>

            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center text-gray-600 hover:text-[#8B0000] transition-colors" onClick={handleAddToCart}>
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs mt-1">Carrito</span>
            </button>
            <div className="relative">
              <button onClick={toggleMenu} className="flex flex-col items-center text-gray-600 hover:text-[#8B0000] transition-colors">
                <FilterIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Filtros</span>
              </button>
              {isMenuOpen && (
                <div ref={menuRef} className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 sm:w-48">
                  <Menu attribute="categories" showMoreLimit={25}
                    classNames={{
                      selectedItem: "font-bold text-gray-900",
                      item: "hover:text-gray-900 text-gray-400",
                    }}
                  />
                </div>
              )}
            </div>
            <button className="flex flex-col items-center text-gray-600 hover:text-[#8B0000] transition-colors">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;