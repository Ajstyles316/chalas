import React from 'react';
import { Settings, Calendar, Star, Bell } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
          alt="Cover"
          className="w-full h-45 object-cover rounded-t-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
          alt="Profile"
          className="absolute -bottom-10 left-6 w-24 h-24 rounded-full border-4 border-white"
        />
      </div>

      <div className="pt-14 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-black">Carlos Rodriguez</h2>
            <p className="text-gray-600">Organizador de Eventos Senior</p>
          </div>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
            Editar Perfil
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-orange-400" />
            <span className="text-black">23 Eventos Organizados</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-orange-400" />
            <span className="text-black">4.9 Calificación</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <button className="w-full flex items-center justify-between p-3 hover:bg-yellow-50 rounded-lg transition">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-orange-500" />
              <span className="text-black">Configuración</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-yellow-50 rounded-lg transition">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-orange-500" />
              <span className="text-black">Notificaciones</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
