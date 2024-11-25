import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import AISearch from './components/AISearch';
import Advertisement from './components/Advertisement';
import TopProviders from './components/TopProviders';
import Complaints from './components/Complaints';
import Chatbot from './components/Chatbot'; // Componente de chatbot original
import Coupons from './components/Coupons';
import Footer from './components/Footer';
import { AlertCircle, Send } from 'lucide-react';
import Products from './components/Products';

export default function HomeClient() {
  const [complaint, setComplaint] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Izquierdo - ChatbotBox y Complaints */}
          <div className="lg:col-span-3 space-y-8">
            {/* ChatbotBox personalizado */}
            
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-6 space-y-8">
            <AISearch />
            <Advertisement />
          </div>

          {/* Sidebar Derecho - Perfil de Usuario */}
          <div className="lg:col-span-3 space-y-8">
          </div>
        </div>

        {/* Secciones de Ancho Completo */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <TopProviders />
          </div>
          <div className="col-span-1">
            <Coupons />
          </div>
          <div className="col-span-2">
            <Products />
          </div>
        </div>
      </main>

      <Footer />

      {/* Chatbot original en la parte inferior */}
      <Chatbot />
    </div>
  );
}
