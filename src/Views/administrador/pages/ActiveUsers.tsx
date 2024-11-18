import React from 'react';
import { User, MoreVertical, UserCheck, UserX } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastActive: string;
  role: string;
}

const mockUsers: UserData[] = [
  { id: 1, name: 'Ana García', email: 'ana@example.com', status: 'active', lastActive: '2024-03-10 15:30', role: 'Cliente' },
  { id: 2, name: 'Carlos López', email: 'carlos@example.com', status: 'active', lastActive: '2024-03-10 14:45', role: 'Proveedor' },
  { id: 3, name: 'María Rodríguez', email: 'maria@example.com', status: 'inactive', lastActive: '2024-03-09 18:20', role: 'Cliente' },
];

export const ActiveUsers = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Usuarios Activos</h2>
            <p className="text-gray-600">Gestiona los usuarios de la plataforma</p>
          </div>
          <button className="bg-[#FE9748] text-white px-4 py-2 rounded-lg hover:bg-[#FDD46B] transition-colors">
            Nuevo Usuario
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Última Actividad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rol</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-[#F8F8F8]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FDD46B] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#FE9748]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? (
                        <UserCheck className="w-4 h-4" />
                      ) : (
                        <UserX className="w-4 h-4" />
                      )}
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{user.lastActive}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{user.role}</td>
                  <td className="px-4 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
