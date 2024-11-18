import React from 'react';
import { Tag } from 'lucide-react';

export const CouponUsage = () => {
  const coupons = [
    {
      user: 'Ana García',
      order: '#ORD-2024-001',
      code: 'SPRING20',
      store: 'Tienda Flores'
    },
    {
      user: 'Carlos López',
      order: '#ORD-2024-002',
      code: 'SUMMER15',
      store: 'Decoraciones Festivas'
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Uso de Cupones</h2>
        <Tag className="w-5 h-5 text-[#FDD46B]" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-[#FE9748]">
            <tr>
              <th className="px-6 py-3 text-white">Usuario</th>
              <th className="px-6 py-3 text-white">Pedido</th>
              <th className="px-6 py-3 text-white">Código</th>
              <th className="px-6 py-3 text-white">Tienda</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index} className="border-b hover:bg-[#FDD46B]">
                <td className="px-6 py-4">{coupon.user}</td>
                <td className="px-6 py-4 font-medium">{coupon.order}</td>
                <td className="px-6 py-4">
                  <span className="bg-[#FCA775] text-white text-xs font-medium px-2.5 py-0.5 rounded">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-6 py-4">{coupon.store}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
