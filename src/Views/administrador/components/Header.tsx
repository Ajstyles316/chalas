import React, { useState } from 'react';
import { Menu, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/usuarios':
        return 'Usuarios Activos';
      case '/ordenes':
        return 'Reporte de Órdenes';
      case '/cupones':
        return 'Uso de Cupones';
      case '/eventos':
        return 'Gráfico de Eventos';
      case '/ventas':
        return 'Informe de Ventas';
      default:
        return 'Panel Administrativo';
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          {/* Título centrado */}
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">
            ChalitaOE
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-[#FDD46B] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#FE9748]" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">Uusario Chalita</p>
                <p className="text-xs text-gray-500">adminChalita.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">Usuario Chalita</p>
                  <p className="text-xs text-gray-500">adminChalita@gmail.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Configuración
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};