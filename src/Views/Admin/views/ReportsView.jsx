import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { getReports } from "../services/getReports";
import { ReportsGrid } from "../components/Reports/ReportsGrid";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const ReportsView = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((r) => setReports(r));
  }, []);

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Agregar título, logo e información
    doc.addImage("src/assets/img/appLogo.jpeg", "JPEG", 15, 10, 30, 30);
    doc.setFontSize(18);
    doc.text("Listado de Reportes", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("ChalitaOe - Informes y Reportes", 105, 50, null, null, "center");
    doc.text(`Emitido: ${currentDate}`, 105, 60, null, null, "center");
    doc.setFontSize(10);
    doc.text(
      "Este reporte tiene como objetivo presentar un resumen detallado sobre los reportes registrados en el sistema ChalitaOe.",
      15,
      70,
      { maxWidth: 180 }
    );

    // Extraer los datos desde el estado 'reports'
    const reportsData = reports.map((report) => [
      report.name_client,  // Cliente
      report.role,         // Tipo de usuario
      report.phone_number, // Teléfono
      report.type,         // Tipo de queja
      report.date.toDate().toLocaleString() // Fecha de queja
    ]);

    doc.autoTable({
      startY: 80,
      head: [["Cliente", "Tipo de Usuario", "Teléfono", "Tipo de Queja", "Fecha de Queja"]],
      body: reportsData,
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

    // Agregar el logo de la empresa (si lo necesitas)
    doc.addImage("src/assets/img/companyLogo.png", "PNG", 15, doc.lastAutoTable.finalY + 55, 30, 30);

    doc.text(
      `ChalitaOe © ${new Date().getFullYear()}. Todos los derechos reservados.`,
      105,
      doc.lastAutoTable.finalY + 95,
      null,
      null,
      "center"
    );

    // Guardar el archivo PDF
    doc.save("listado_reportes.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    // Extraer los datos desde el estado 'reports'
    const reportsData = reports.map((report) => ({
      Cliente: report.name_client,
      Tipo: report.role,
      Teléfono: report.phone_number,
      "Tipo de Queja": report.type,
      "Fecha de Queja": report.date.toDate().toLocaleString()
    }));

    // Crear un libro de trabajo y una hoja
    const ws = XLSX.utils.json_to_sheet(reportsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reportes");

    // Exportar el archivo Excel
    XLSX.writeFile(wb, "listado_reportes.xlsx");
  };

  return (
    <AdminLayout>
      <div className={`w-full flex justify-center items-center py-10`}>
        <section className="flex flex-col items-center 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          <div className="flex justify-between items-center mb-5 w-full">
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">Listado de reportes</h1>
            </div>
            <div className="flex space-x-4">
              {/* Botones para exportar a PDF y Excel */}
              <button
                onClick={exportToPDF}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Exportar a PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Exportar a Excel
              </button>
            </div>
          </div>

          {/* Contenedor del grid de reportes que se va a exportar */}
          <div id="reports-grid-container">
            {reports ? (
              <ReportsGrid reports={reports} />
            ) : (
              <p className="text-gray-500">Cargando reportes...</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
