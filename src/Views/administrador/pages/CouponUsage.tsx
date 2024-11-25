import React from 'react';
import { Ticket, Download } from 'lucide-react';

interface CouponUsage {
  id: string;
  user: string;
  order: string;
  code: string;
  store: string;
  date: string;
  discount: number;
}

const mockCouponUsage: CouponUsage[] = [
  { id: 'CPN-001', user: 'Ana García', order: 'ORD-001', code: 'SPRING20', store: 'Florería Luna', date: '2024-03-10', discount: 20 },
  { id: 'CPN-002', user: 'Carlos López', order: 'ORD-002', code: 'SWEET10', store: 'Pastelería Dulce', date: '2024-03-09', discount: 10 },
  { id: 'CPN-003', user: 'María Rodríguez', order: 'ORD-003', code: 'PARTY15', store: 'Decoraciones Festa', date: '2024-03-08', discount: 15 },
];

export const CouponUsage = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Uso de Cupones</h2>
            <p className="text-gray-600">Seguimiento de cupones utilizados</p>
          </div>
          <button className="flex items-center gap-2 bg-[#FE9748] text-white px-4 py-2 rounded-lg hover:bg-[#FDD46B] transition-colors">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Total Cupones Usados</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">152</p>
          </div>
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Descuento Promedio</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">15%</p>
          </div>
          <div className="bg-[#FDD46B] p-4 rounded-lg">
            <h3 className="text-[#4A4E69] font-semibold mb-1">Ahorro Total</h3>
            <p className="text-2xl font-bold text-[#4A4E69]">$1,250.00</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Orden</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Código</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tienda</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Descuento</th>
              </tr>
            </thead>
            <tbody>
              {mockCouponUsage.map((coupon) => (
                <tr key={coupon.id} className="border-b border-gray-100 hover:bg-[#FDD46B]">
                  <td className="px-4 py-4 text-[#4A4E69]">{coupon.user}</td>
                  <td className="px-4 py-4 text-gray-600">{coupon.order}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-[#FE9748]" />
                      <span className="font-medium text-[#FE9748]">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{coupon.store}</td>
                  <td className="px-4 py-4 text-gray-600">{coupon.date}</td>
                  <td className="px-4 py-4 font-medium text-[#FE9748]">{coupon.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
