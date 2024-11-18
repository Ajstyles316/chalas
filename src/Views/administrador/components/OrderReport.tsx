import React from 'react';
import { Package } from 'lucide-react';

export const OrderReport = () => {
  const orders = [
    {
      id: '#ORD-2024-001',
      client: 'Ana García',
      provider: 'Tienda Flores',
      status: 'Completado',
      amount: 150
    },
    {
      id: '#ORD-2024-002',
      client: 'Carlos López',
      provider: 'Decoraciones Festivas',
      status: 'En Proceso',
      amount: 280
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Reporte de Órdenes</h2>
        <Package className="w-5 h-5 text-indigo-600" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID Orden</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Proveedor</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Monto</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.client}</td>
                <td className="px-6 py-4">{order.provider}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Completado' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">${order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};