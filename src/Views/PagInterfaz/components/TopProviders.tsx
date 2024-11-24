import React from 'react';
import { Star, Award, ThumbsUp, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopProviders() {
  const navigate = useNavigate();
  const providers = [
    {
      name: "EventPro Solutions",
      rating: 4.9,
      reviews: 128,
      specialty: "Bodas y Eventos",
      location: "Ciudad de México",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Luxury Events Co",
      rating: 4.8,
      reviews: 96,
      specialty: "Eventos de Lujo",
      location: "Guadalajara",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Creative Celebrations",
      rating: 4.7,
      reviews: 84,
      specialty: "Fiestas Temáticas",
      location: "Monterrey",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];
  const handleCardClick = (provider) => {
    navigate(`/ClientProvider`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="h-8 w-8 text-orange-500 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-orange-700">Destacados</h2>
            <p className="text-salmon-600">Top proveedores</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {providers.map((provider, index) => (
          <div key={index} onClick={() => handleCardClick(provider)} className="flex items-center space-x-4 border rounded-lg p-3 hover:shadow-md transition bg-yellow-50">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-orange-600">{provider.name}</h3>
                <div className="flex items-center bg-yellow-200 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-semibold text-orange-700">{provider.rating}</span>
                </div>
              </div>
              <p className="text-sm text-orange-500">{provider.specialty}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-sm text-orange-600">
                  <MapPin className="h-4 w-4 mr-1 text-orange-400" />
                  <span>{provider.location}</span>
                </div>
                <div className="flex items-center text-sm text-salmon-600">
                  <ThumbsUp className="h-4 w-4 mr-1 text-orange-400" />
                  <span>{provider.reviews} reseñas</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
