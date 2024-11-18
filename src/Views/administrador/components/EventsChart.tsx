import React from 'react';
import { Cake, Heart, Gift, Calendar } from 'lucide-react';

export const EventsChart = () => {
  const events = [
    { type: 'Cumpleaños', icon: Cake, count: 45, color: 'bg-pink-500' },
    { type: 'Baby Shower', icon: Gift, count: 30, color: 'bg-blue-500' },
    { type: 'Parejas', icon: Heart, count: 25, color: 'bg-red-500' },
    { type: 'Casuales', icon: Calendar, count: 35, color: 'bg-purple-500' },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Gráfico de Eventos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <event.icon className={`w-8 h-8 ${event.color.replace('bg-', 'text-')}`} />
              <span className="text-2xl font-bold">{event.count}</span>
            </div>
            <p className="text-sm text-gray-600">{event.type}</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className={`${event.color} h-2 rounded-full`} style={{ width: `${(event.count / 50) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};