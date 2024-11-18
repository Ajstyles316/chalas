import React from 'react';
import { Ticket, Clock, MapPin } from 'lucide-react';

export default function Coupons() {
  const coupons = [
    {
      venue: "Salón Royal Palace",
      discount: "25% OFF",
      code: "ROYAL25",
      expiry: "3 días",
      location: "Ciudad de México"
    },
    {
      venue: "Garden Events",
      discount: "2x1",
      code: "GARDEN2X1",
      expiry: "1 semana",
      location: "Guadalajara"
    },
    {
      venue: "Elite Celebrations",
      discount: "15% OFF",
      code: "ELITE15",
      expiry: "5 días",
      location: "Monterrey"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Ticket className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">Cupones</h2>
            <p className="text-gray-600">Descuentos exclusivos</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{coupon.venue}</h3>
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-semibold">
                {coupon.discount}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{coupon.location}</span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Expira en {coupon.expiry}</span>
              </div>
              <button className="text-purple-600 font-semibold text-sm hover:text-purple-700">
                Usar: {coupon.code}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}