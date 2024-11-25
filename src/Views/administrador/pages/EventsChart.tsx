import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

const mockData = [
  { month: 'Ene', cumpleanos: 45, baby: 30, parejas: 25, casuales: 20 },
  { month: 'Feb', cumpleanos: 50, baby: 35, parejas: 40, casuales: 25 },
  { month: 'Mar', cumpleanos: 35, baby: 28, parejas: 30, casuales: 15 },
];

const eventTypes = [
  { name: 'Cumpleaños', color: '#FDD46B' }, // Amarillo
  { name: 'Baby Shower', color: '#FE9748' }, // Naranja
  { name: 'Parejas', color: '#E77F6A' }, // Salmón
  { name: 'Casuales', color: '#FFA07A' }, // Durazno
];

export const EventsChart = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gráfico de Eventos</h2>
            <p className="text-gray-600">Distribución de eventos por categoría</p>
          </div>
          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option value="year">Último Año</option>
              <option value="semester">Último Semestre</option>
              <option value="quarter">Último Trimestre</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {eventTypes.map((type) => (
            <div key={type.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" style={{ color: 'gray' }} />
                <h3 className="font-semibold text-gray-800">{type.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: type.color }}>
                  {Math.floor(Math.random() * 100 + 50)}
                </span>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" style={{ color: 'gray' }} />
                  <span>+12%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: '#F9FAFB', border: 'none' }} />
              <Legend />
              <Bar dataKey="cumpleanos" name="Cumpleaños" fill="#FDD46B" /> {/* Amarillo */}
              <Bar dataKey="baby" name="Baby Shower" fill="#FE9748" /> {/* Naranja */}
              <Bar dataKey="parejas" name="Parejas" fill="#E77F6A" /> {/* Salmón */}
              <Bar dataKey="casuales" name="Casuales" fill="#FFA07A" /> {/* Durazno */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
