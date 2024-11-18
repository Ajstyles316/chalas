import React from 'react';
import { Download, Store } from 'lucide-react';

export const SalesReport = () => {
  const sales = [
    {
      store: 'Tienda Flores',
      code: 'SPRING20',
      sales: 45,
      revenue: 4500
    },
    {
      store: 'Decoraciones Festivas',
      code: 'SUMMER15',
      sales: 32,
      revenue: 3200
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Informe de Ventas</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" />
          Exportar Excel
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Tienda</th>
              <th className="px-6 py-3">Código</th>
              <th className="px-6 py-3">Ventas</th>
              <th className="px-6 py-3">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  {sale.store}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {sale.code}
                  </span>
                </td>
                <td className="px-6 py-4">{sale.sales}</td>
                <td className="px-6 py-4">${sale.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};