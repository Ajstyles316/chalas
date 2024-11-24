import React from 'react';
import { Download, Store, Tag, TrendingUp } from 'lucide-react';

interface SalesData {
  store: string;
  couponCode: string;
  totalSales: number;
  ordersCount: number;
  growth: number;
}

const mockSalesData: SalesData[] = [
  { store: 'Florería Luna', couponCode: 'SPRING20', totalSales: 2500.00, ordersCount: 45, growth: 12.5 },
  { store: 'Pastelería Dulce', couponCode: 'SWEET10', totalSales: 1800.50, ordersCount: 32, growth: 8.3 },
  { store: 'Decoraciones Festa', couponCode: 'PARTY15', totalSales: 3200.75, ordersCount: 58, growth: 15.7 },
];

export const SalesReport = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Informe de Ventas</h2>
            <p className="text-gray-600">Análisis de ventas por tienda y cupón</p>
          </div>
          <button className="flex items-center gap-2 bg-[#FE9748] text-white px-4 py-2 rounded-lg hover:bg-[#FDD46B] transition-colors">
            <Download className="w-5 h-5" />
            Exportar Excel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Ventas Totales</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">$7,500.25</p>
          </div>
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Total Órdenes</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">135</p>
          </div>
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Promedio por Orden</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">$55.56</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tienda</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Código de Descuento</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ventas Totales</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Órdenes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Crecimiento</th>
              </tr>
            </thead>
            <tbody>
              {mockSalesData.map((sale, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-[#FDD46B]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-[#FE9748]" />
                      <span className="font-medium text-[#4A4E69]">{sale.store}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#FE9748]" />
                      <span className="text-[#FE9748] font-medium">{sale.couponCode}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-[#4A4E69]">
                    ${sale.totalSales.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{sale.ordersCount}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-[#FE9748]">
                      <TrendingUp className="w-4 h-4" />
                      <span>{sale.growth}%</span>
                    </div>
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
