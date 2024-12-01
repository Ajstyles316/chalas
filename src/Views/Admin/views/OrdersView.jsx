import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { getOrders } from "../services/getOrders";
import { OrdersGrid } from "../components/Orders/OrdersGrid";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para tablas si las necesitas
import * as XLSX from "xlsx"; // Importamos la librería para exportar a Excel

export const OrdersView = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(o => setOrders(o));
  }, []);

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Agregar primer logo (appLogo)
    doc.addImage("src/assets/img/appLogo.jpeg", "JPEG", 15, 10, 30, 30);

    doc.setFontSize(18);
    doc.text("Listado de Órdenes", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("ChalitaOe - Informes y Reportes", 105, 50, null, null, "center");
    doc.text(`Emitido: ${currentDate}`, 105, 60, null, null, "center");
    doc.setFontSize(10);
    doc.text(
      "Este reporte tiene como objetivo presentar un resumen detallado sobre las órdenes registradas en el sistema ChalitaOe.",
      15,
      70,
      { maxWidth: 180 }
    );

    // Extraemos los datos desde el estado de orders
    const ordersData = orders.map(order => [
      order.name_client, // Cliente
      order.name_store, // Tienda
      order.status ? "Activo" : "Inactivo", // Estado
      "01/01/2024", // Fecha de entrega inventada
      order.total // Total
    ]);

    doc.autoTable({
      startY: 80,
      head: [["Cliente", "Tienda", "Estado", "Fecha de Entrega", "Cupon"]],
      body: ordersData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, halign: "center" }
    });

    // Notas y firma
    doc.setFontSize(10);
    doc.text("Notas:", 15, doc.lastAutoTable.finalY + 10);
    doc.text(
      "Este reporte es generado automáticamente por el sistema de gestión ChalitaOe. Verifique los datos antes de firmar.",
      15,
      doc.lastAutoTable.finalY + 20,
      { maxWidth: 180 }
    );
    doc.text("Firma del Administrador", 50, doc.lastAutoTable.finalY + 40);
    doc.text("Sello de la Empresa", 150, doc.lastAutoTable.finalY + 40);
    doc.line(40, doc.lastAutoTable.finalY + 45, 80, doc.lastAutoTable.finalY + 45);
    doc.line(140, doc.lastAutoTable.finalY + 45, 180, doc.lastAutoTable.finalY + 45);

    // Pie de página
    const footerText =
      "La empresa Capysharks Devs SRL, creadora de la página ChalitaOe, lleva un registro de todos los datos impresos en este reporte y realiza un seguimiento constante de los mismos para garantizar la calidad del servicio.";
    doc.setFontSize(8);
    doc.text(footerText, 60, doc.lastAutoTable.finalY + 65, { maxWidth: 120 });

    // Agregar el segundo logo (companyLogo) junto al pie de página
    doc.addImage("src/assets/img/companyLogo.png", "PNG", 15, doc.lastAutoTable.finalY + 55, 30, 30);

    doc.text(
      `ChalitaOe © ${new Date().getFullYear()}. Todos los derechos reservados.`,
      105,
      doc.lastAutoTable.finalY + 95,
      null,
      null,
      "center"
    );

    doc.save("listado_ordenes.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const ordersData = orders.map(order => ({
      Cliente: order.name_client,
      Tienda: order.name_store,
      Estado: order.status ? "Activo" : "Inactivo",
      "Fecha de Entrega": "01/01/2024", // Fecha inventada
      Total: order.total
    }));

    // Crear un libro de trabajo y una hoja
    const ws = XLSX.utils.json_to_sheet(ordersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Órdenes");

    // Exportar el archivo Excel
    XLSX.writeFile(wb, "listado_ordenes.xlsx");
  };

  return (
    <AdminLayout>
      <div className={`w-full flex justify-center items-center py-10`}>
        <section className="flex flex-col items-center 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          {/* Contenedor para centrar el texto y el botón */}
          <div className="flex justify-between items-center mb-5 w-full">
            {/* Contenedor para el título centrado */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">Listado de Ordenes </h1>
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

          {/* Contenedor del grid de órdenes que se va a exportar */}
          <div id="orders-grid-container">
            {orders ? (
              <OrdersGrid orders={orders} />
            ) : (
              <p className="text-gray-500">Cargando órdenes...</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
