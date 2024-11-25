import React from 'react';
import { BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';

export default function SimpleReports() {
  const stats = [
    { title: "Eventos Totales", value: "1,234", icon: Calendar, trend: "+12%" },
    { title: "Usuarios Activos", value: "856", icon: Users, trend: "+8%" },
    { title: "Tasa de Éxito", value: "94%", icon: TrendingUp, trend: "+3%" },
    { title: "Reservas Mensuales", value: "286", icon: BarChart2, trend: "+15%" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-[#A13A11]">Resumen de Actividad</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-4 border rounded-lg bg-[#FDD46B] hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-6 w-6 text-[#A13A11]" />
                <span className="text-[#FE9748] text-sm font-semibold">{stat.trend}</span>
              </div>
              <p className="text-gray-700 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-[#A13A11]">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
