import React from 'react';
import { Search, MessageSquare, Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-black">
                ChalitaOE
              </h1>
              <span className="text-xs text-gray-500">Bienvenido Usuario!</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <MessageSquare className="h-6 w-6 text-orange-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="h-6 w-6 text-orange-500" />
              </button>
              <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
