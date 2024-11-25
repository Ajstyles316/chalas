import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserGrid } from "../components/Users/UserGrid";
import { getUsers } from "../services/getUsers";

export const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((u) => setUsers(u));
  }, []);

  // Función para exportar usando la vista de impresión del navegador
  const exportToPDF = () => {
    const printContents = document.getElementById("user-grid-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `<html><head><title>Clientes</title></head><body>${printContents}</body></html>`;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <AdminLayout>
      <div className={`w-full flex justify-center items-center py-10`}>
        <section className="flex flex-col items-center 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          {/* Contenedor para centrar el texto y el botón */}
          <div className="flex justify-between items-center mb-5 w-full">
            {/* Contenedor para el título centrado */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">
                Gestión de Clientes
              </h1>
            </div>
            {/* Botón para exportar a PDF */}
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Exportar a PDF
            </button>
          </div>

          {/* Contenedor del grid de usuarios que se va a exportar */}
          <div id="user-grid-container">
            {users ? (
              <UserGrid users={users} setUsers={setUsers} />
            ) : (
              <p className="text-gray-500">Cargando clientes...</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

