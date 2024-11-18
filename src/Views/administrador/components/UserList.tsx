import React from 'react';
import { User, CheckCircle } from 'lucide-react';

export const UserList = () => {
  const users = [
    { name: 'Ana García', email: 'ana@example.com', status: 'Activo' },
    { name: 'Carlos López', email: 'carlos@example.com', status: 'Activo' },
    { name: 'María Rodríguez', email: 'maria@example.com', status: 'Activo' },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Usuarios Activos</h2>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {users.length} activos
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Usuario</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};