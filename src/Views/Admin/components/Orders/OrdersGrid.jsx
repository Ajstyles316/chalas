import { useState } from "react";
import { OrdersCard } from "./OrdersCard";

export const OrdersGrid = ({ orders }) => {
  // Estado para almacenar el valor del filtro (búsqueda)
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar las órdenes por nombre de cliente
  const filteredOrders = orders.filter(order =>
    order.name_client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto mt-5 p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de cliente"
          className="px-4 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el valor del filtro
        />
      </div>

      {/* Tabla de pedidos */}
      <table className="w-full text-left rtl:text-right text-lg bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Nombre del Cliente</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Nombre de la Tienda</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Estado</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Fecha de Entrega</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapear y mostrar las órdenes filtradas */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrdersCard
                key={order.uid}
                name_of_client={order.name_client}
                name_of_store={order.name_store}
                status={order.status}
                total={order.total}
                delivery_date={order.date}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No se encontraron pedidos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
