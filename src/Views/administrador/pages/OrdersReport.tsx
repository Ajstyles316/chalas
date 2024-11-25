import React from 'react';
import { Package, Search, Filter } from 'lucide-react';

interface Order {
  id: string;
  client: string;
  provider: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
}

const mockOrders: Order[] = [
  { id: 'ORD-001', client: 'Ana García', provider: 'Florería Luna', date: '2024-03-10', status: 'completed', total: 150.00 },
  { id: 'ORD-002', client: 'Carlos López', provider: 'Pastelería Dulce', date: '2024-03-09', status: 'pending', total: 85.50 },
  { id: 'ORD-003', client: 'María Rodríguez', provider: 'Decoraciones Festa', date: '2024-03-08', status: 'cancelled', total: 200.00 },
];

export const OrdersReport = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Reporte de Órdenes</h2>
            <p className="text-gray-600">Gestiona los pedidos entre clientes y proveedores</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar orden..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-orange-500" />
              Filtrar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID Orden</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cliente</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Proveedor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-500" />
                      <span className="font-medium text-gray-800">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{order.client}</td>
                  <td className="px-4 py-4 text-gray-600">{order.provider}</td>
                  <td className="px-4 py-4 text-gray-600">{order.date}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-sm ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-800">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
