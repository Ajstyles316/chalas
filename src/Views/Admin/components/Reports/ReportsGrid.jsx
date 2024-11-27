import { useState } from "react";
import { ReportsCard } from "./ReportsCard";

export const ReportsGrid = ({ reports }) => {
  // Estado para almacenar el valor del filtro (búsqueda)
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar los informes por nombre de cliente
  const filteredReports = reports.filter(report =>
    report.name_client.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Tabla de informes */}
      <table className="w-full text-left rtl:text-right text-lg bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Nombre del Cliente</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Tipo de Usuario</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Número de Teléfono</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Tipo de Queja</th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold uppercase">Fecha de Queja</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapear y mostrar los informes filtrados */}
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <ReportsCard
                key={report.uid}
                name={report.name_client}
                rol={report.role}
                tel={report.phone_number}
                type={report.type}
                date={report.date}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No se encontraron informes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
