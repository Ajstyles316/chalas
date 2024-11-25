import React from 'react'
import { EyeOff, Lock } from 'lucide-react'

const UnauthorizedView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <EyeOff className="text-red-500 w-24 h-24" />
            <Lock className="absolute bottom-0 right-0 text-blue-500 w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Alto ahí, chismoso!
        </h1>
        <p className="text-xl text-red-600 font-semibold mb-6">
          NO PUEDES CHISMEAR POR AQUÍ
        </p>
        <p className="text-gray-600 mb-8">
          Lo sentimos, pero no tienes autorización para acceder a esta área. 
          Vuelve por donde viniste o contacta al administrador si crees que esto es un error.
        </p>
        <button 
          onClick={() => window.history.back()} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Volver a la página anterior"
        >
          Volver atrás
        </button>
      </div>
    </div>
  )
}

export default UnauthorizedView

