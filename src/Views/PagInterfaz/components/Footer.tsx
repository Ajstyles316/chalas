import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-700">ChalitaOE</h3>
            <p className="text-orange-600">Haciendo tus eventos extraordinarios desde 1970</p>
            <div className="flex items-center space-x-2 text-orange-600">
              <Heart size={20} className="text-red-500" />
              <span>Con amor y dedicación</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-700">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-orange-600">
                <Mail size={18} />
                <span>info@chalitaoe.com</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-600">
                <Phone size={18} />
                <span>+52 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-600">
                <MapPin size={18} />
                <span>Ciudad de México, México</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-700">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'Servicios', 'Galería', 'Testimonios', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-orange-600 hover:text-orange-700 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-700">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-orange-200 rounded-full text-orange-700 hover:bg-orange-300 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-orange-200 rounded-full text-orange-700 hover:bg-orange-300 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-orange-200 rounded-full text-orange-700 hover:bg-orange-300 transition">
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-orange-600 text-sm">
              Mantente conectado con nosotros en redes sociales
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-orange-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-orange-600 text-sm">
              © {new Date().getFullYear()} ChalitaOE. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-orange-600 hover:text-orange-700 text-sm">
                Términos y Condiciones
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-700 text-sm">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}