import { useState } from 'react';
import { UserCard } from "./UserCard";

export const UserGrid = ({ users, setUsers }) => {
  const [filter, setFilter] = useState("all");

  // Función para manejar el filtro de usuarios
  const handleFilter = (role) => {
    setFilter(role);
  };

  // Filtramos los usuarios según el tipo seleccionado
  const filteredUsers = filter === "all" ? users : users.filter(user => user.role === filter);

  return (
    <div className="overflow-x-auto mt-5 px-6 py-6 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Usuarios Activos</h2>

      {/* Filtro por tipo de usuario */}
      <div className="mb-6 text-center">
        <button
          onClick={() => handleFilter("client")}
          className="px-6 py-3 mx-4 rounded-full bg-blue-300 text-gray-900 hover:bg-blue-400 transition duration-300"
        >
          Clientes
        </button>
        <button
          onClick={() => handleFilter("provider")}
          className="px-6 py-3 mx-4 rounded-full bg-orange-300 text-gray-900 hover:bg-orange-400 transition duration-300"
        >
          Proveedores
        </button>
        <button
          onClick={() => handleFilter("all")}
          className="px-6 py-3 mx-4 rounded-full bg-gray-400 text-white hover:bg-gray-500 transition duration-300"
        >
          Todos
        </button>
      </div>

      {/* Tabla de usuarios filtrados */}
      <table className="min-w-full text-left rtl:text-right text-lg table-auto border-separate border-spacing-0">
        <thead className="bg-gray-300 text-gray-800">
          <tr>
            <th scope="col" className="px-6 py-4 border-b-2 text-sm">Nombre</th>
            <th scope="col" className="px-6 py-4 border-b-2 text-sm">Correo</th>
            <th scope="col" className="px-6 py-4 border-b-2 text-sm">Última Actividad</th>
            <th scope="col" className="px-6 py-4 border-b-2 text-sm">Gestión</th>
            <th scope="col" className="px-6 py-4 border-b-2 text-sm">Rol</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {
            filteredUsers.map(user => (
              <UserCard
                key={user.uid}
                id={user.uid}
                name={user.name ? user.name : user.firstName}
                email={user.email}
                lastActivity={user.createdAt}
                role={user.role}
                status={user.isActive}
                setUsers={setUsers}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
