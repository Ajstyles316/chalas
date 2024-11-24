import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, ShoppingBag, Ticket, PieChart, BarChart3 } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Users, label: 'Usuarios Activos', path: '/usuarios' },
    { icon: ShoppingBag, label: 'Reporte de Órdenes', path: '/ordenes' },
    { icon: Ticket, label: 'Uso de Cupones', path: '/cupones' },
    { icon: PieChart, label: 'Gráfico de Eventos', path: '/eventos' },
    { icon: BarChart3, label: 'Informe de Ventas', path: '/ventas' },
  ];

  return (
    <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-lg">
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white' // Cambiado a un fondo naranja para el elemento activo
                  : 'text-gray-700 hover:bg-yellow-200 hover:text-orange-500' // Cambiado a un fondo amarillo claro en hover y texto naranja
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
