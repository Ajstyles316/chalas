import React from 'react';
import '../../../styles config/tailwind.css'

export const Provider = ({ providerName = "Provider" }) => {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-orange-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-800 mb-6">
          Bienvenido, {providerName}!
        </h1>
        <p className="text-lg text-orange-700 mb-8">
          Nos alegra verte de nuevo. Aquí tienes un resumen de tu actividad reciente y acciones rápidas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-orange-700 mb-4">Resumen</h2>
            <ul className="space-y-2">
              <li className="text-gray-700">5 eventos próximos</li>
              <li className="text-gray-700">3 mensajes nuevos</li>
              <li className="text-gray-700">10 clientes activos</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-orange-700 mb-4">Acciones Rápidas</h2>
            <div className="space-y-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Crear Nuevo Evento
              </button>
              <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 px-4 rounded transition duration-300">
                Ver Mensajes
              </button>
              <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 px-4 rounded transition duration-300">
                Actualizar Perfil
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Próximos Eventos</h2>
          <ul className="space-y-4">
            {[1, 2, 3].map((event) => (
              <li key={event} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-semibold text-gray-800">Evento {event}</p>
                  <p className="text-sm text-gray-600">Fecha: 15/0{event}/2024</p>
                </div>
                <button className="text-orange-500 hover:text-orange-600">
                  Ver Detalles
                </button>
              </li>
            ))}
          </ul>
        </div>  
        
        <footer className="mt-12 text-center text-gray-600">
          <p>¿Necesitas ayuda? Contacta a nuestro equipo de soporte</p>
          <button className="mt-2 text-orange-500 hover:text-orange-600">
            Configuración de la cuenta
          </button>
        </footer>
      </div>
    </div>
  );
};
