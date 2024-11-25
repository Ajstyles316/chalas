import { NavLink } from "react-router-dom";
import { OrdersIcon } from "./icons/OrdersIcon";
import { ReportsIcon } from "./icons/ReportsIcon";
import { UsersIcon } from "./icons/UsersIcon";
import { EventsIcon } from "./icons/EventsIcon";

// Configuración de los ítems de la barra lateral
const itemsFromSideBar = [
  {
    id: 1,
    name: "Clientes",
    icon: <UsersIcon className="w-6 h-6" />, // Tamaño de ícono ajustado
    to: "/",
  },
  {
    id: 2,
    name: "Órdenes",
    icon: <OrdersIcon className="w-6 h-6" />, // Tamaño de ícono ajustado
    to: "/orders",
  },
  {
    id: 3,
    name: "Eventos",
    icon: <EventsIcon className="w-6 h-6" />, // Tamaño de ícono ajustado
    to: "/events",
  },
  {
    id: 4,
    name: "Reportes",
    icon: <ReportsIcon className="w-6 h-6" />, // Tamaño de ícono ajustado
    to: "/reports",
  },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col px-6 py-4 h-screen w-64 overflow-y-auto fixed bg-white shadow-md rounded-xl">
      <h1 className="text-lg font-semibold mb-6 text-gray-800 tracking-wide">
        Panel Administrativo
      </h1>
      <ul className="flex flex-col gap-3">
        {itemsFromSideBar.map((item) => (
          <li
            className="flex h-12 items-center rounded-lg transition-all duration-300"
            key={item.id}
          >
            <NavLink
              className={({ isActive }) =>
                `flex gap-3 items-center px-4 py-2 font-medium w-full rounded-lg ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                } transition-colors duration-300`
              }
              to={item.to}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <p>
          <NavLink
            className={({ isActive }) =>
              `flex gap-3 items-center px-4 py-2 font-medium rounded-lg ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              } transition-colors duration-300`
            }
            to="/logout"
          >
            <svg
              className="w-6 h-6" // Tamaño ajustado para el ícono
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9.002 7C9.014 4.825 9.111 3.647 9.879 2.879 10.758 2 12.172 2 15 2h1c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.879 5.121-.768.768-1.946.865-4.121.877M9.002 17C9.014 19.175 9.111 20.353 9.879 21.121 10.52 21.763 11.447 21.936 13 21.983"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
            Cerrar Sesión
          </NavLink>
        </p>
      </div>
    </aside>
  );
};
