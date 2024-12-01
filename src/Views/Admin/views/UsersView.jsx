import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserGrid } from "../components/Users/UserGrid";
import { getUsers } from "../services/getUsers";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para tablas si las necesitas
import * as XLSX from "xlsx"; // Importamos la librería para exportar a Excel

export const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all"); // El filtro de usuarios (todos, clientes, proveedores)

  useEffect(() => {
    getUsers().then((u) => setUsers(u));
  }, []);

  // Función para exportar a PDF
  const exportToPDF = () => {
    const filteredUsers = filter === "all" ? users : users.filter(user => user.role === filter);
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text("Listado de Usuarios", 105, 20, null, null, "center");
    doc.addImage("src/assets/img/appLogo.jpeg", "JPEG", 15, 10, 30, 30);
    doc.setFontSize(12);
    doc.text("ChalitaOe - Informes y Reportes", 105, 40, null, null, "center");
    doc.text(`Emitido: ${currentDate}`, 105, 50, null, null, "center");
    doc.setFontSize(10);
    doc.text("Este reporte tiene como objetivo presentar un resumen detallado sobre la gestión de los usuarios registrados en el sistema ChalitaOe.", 15, 60, { maxWidth: 180 });
    doc.setFontSize(12);
    doc.text("Detalles de los Usuarios:", 15, 80);

    const usersData = filteredUsers.map(user => [user.name, user.email, user.role]);
    doc.autoTable({
      startY: 90,
      head: [["Nombre", "Correo", "Rol"]],
      body: usersData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, halign: "center" }
    });

    doc.setFontSize(10);
    doc.text("Notas:", 15, doc.lastAutoTable.finalY + 10);
    doc.text("Este reporte es generado automáticamente por el sistema de gestión ChalitaOe. Verifique los datos antes de firmar.", 15, doc.lastAutoTable.finalY + 20, { maxWidth: 180 });
    doc.text("Firma del Administrador", 50, doc.lastAutoTable.finalY + 40);
    doc.text("Sello de la Empresa", 150, doc.lastAutoTable.finalY + 40);
    doc.line(40, doc.lastAutoTable.finalY + 45, 80, doc.lastAutoTable.finalY + 45);
    doc.line(140, doc.lastAutoTable.finalY + 45, 180, doc.lastAutoTable.finalY + 45);
    doc.text(`ChalitaOe © ${new Date().getFullYear()}. Todos los derechos reservados.`, 105, doc.lastAutoTable.finalY + 60, null, null, "center");

    const footerText = "La empresa Capysharks Devs SRL, creadora de la página ChalitaOe, lleva un registro de todos los datos impresos en este reporte y realiza un seguimiento constante de los mismos para garantizar la calidad del servicio.";
    doc.addImage("src/assets/img/companyLogo.png", "PNG", 15, doc.lastAutoTable.finalY + 80, 30, 30);
    doc.setFontSize(8);
    doc.text(footerText, 60, doc.lastAutoTable.finalY + 85, { maxWidth: 180 });

    doc.save("listado_usuarios.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const filteredUsers = filter === "all" ? users : users.filter(user => user.role === filter);

    // Preparamos los datos para exportar
    const usersData = filteredUsers.map(user => ({
      Nombre: user.name,
      Correo: user.email,
      Rol: user.role,
    }));

    // Crear un libro de trabajo y una hoja
    const ws = XLSX.utils.json_to_sheet(usersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");

    // Exportar el archivo Excel
    XLSX.writeFile(wb, "listado_usuarios.xlsx");
  };

  return (
    <AdminLayout>
      <div className="w-full flex justify-center items-center py-10">
        <section className="flex flex-col items-center 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          {/* Contenedor para centrar el texto y los botones */}
          <div className="flex justify-between items-center mb-5 w-full">
            {/* Contenedor para el título centrado */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">
                Listado de Usuarios
              </h1>
            </div>
            {/* Botón para exportar a PDF */}
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Exportar a PDF
            </button>
            {/* Botón para exportar a Excel */}
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Exportar a Excel
            </button>
          </div>

          {/* Contenedor del grid de usuarios */}
          <div id="user-grid-container">
            {users ? (
              <UserGrid users={users} setUsers={setUsers} filter={filter} setFilter={setFilter} />
            ) : (
              <p className="text-gray-500">Cargando usuarios...</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
