import React from 'react';
import { Gift, Calendar, Users } from 'lucide-react';

export default function Advertisement() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Ofertas Especiales!</h2>
        <p className="opacity-90">Descubre nuestras promociones exclusivas</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold">20% Descuento</h3>
            <p className="text-sm text-gray-600">Primer Evento</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold">Fechas Flexibles</h3>
            <p className="text-sm text-gray-600">Sin Cargos</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold">Grupos</h3>
            <p className="text-sm text-gray-600">Descuentos Especiales</p>
          </div>
        </div>
        
        <button className="w-full mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
          Ver Todas las Ofertas
        </button>
      </div>
    </div>
  );
}
