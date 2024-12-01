import { EventsChart } from "../components/Events/EventsChart";
import { AdminLayout } from "../layouts/AdminLayout";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Para la tabla
import * as XLSX from "xlsx"; // Para la exportación a Excel

export const EventsView = () => {
  // Función para exportar a PDF
  const exportToPDF = async () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Logo de la empresa (ajusta la ruta al logo)
    doc.addImage("src/assets/img/appLogo.jpeg", "JPEG", 15, 10, 30, 30); // Logo en la parte superior izquierda

    // Título del documento
    doc.setFontSize(18);
    doc.text("Gráfico de Eventos", 105, 30, null, null, "center");

    // Subtítulo
    doc.setFontSize(12);
    doc.text("Reporte de eventos registrados", 105, 40, null, null, "center");

    // Fecha de emisión
    doc.setFontSize(10);
    doc.text(`Emitido: ${currentDate}`, 105, 50, null, null, "center");

    // Descripción del gráfico
    doc.setFontSize(10);
    doc.text(
      "Este reporte contiene un gráfico detallado de los eventos registrados en el sistema, mostrando la distribución por tipo de evento.",
      15,
      60,
      { maxWidth: 180 }
    );

    // Insertar gráfico (tomado del componente EventsChart)
    const chartContainer = document.getElementById("events-chart-container");

    if (chartContainer) {
      const canvas = chartContainer.querySelector("canvas"); // Buscamos el canvas dentro del contenedor
      if (canvas) {
        const chartDataUrl = canvas.toDataURL("image/png"); // Convertimos el canvas a imagen
        doc.addImage(chartDataUrl, "PNG", 15, 80, 180, 120); // Agregar el gráfico como imagen
      }
    }

    // Tabla de eventos (si se requiere más detalle)
    const eventData = [
      { tipo: 'Baby Shower', cantidad: 10 },
      { tipo: 'Cumpleaños', cantidad: 5 },
      { tipo: 'Parejas', cantidad: 15 },
      { tipo: 'Fiestas', cantidad: 3 },
    ];

    const eventDataTable = eventData.map(event => [event.tipo, event.cantidad]);

    doc.autoTable({
      startY: 210,
      head: [["Tipo de Evento", "Cantidad"]],
      body: eventDataTable,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, halign: "center" }
    });

    // Firma y nota adicional
    doc.setFontSize(10);
    doc.text("Notas:", 15, doc.lastAutoTable.finalY + 10);
    doc.text("Este reporte es generado automáticamente por el sistema de gestión de eventos.", 15, doc.lastAutoTable.finalY + 20, { maxWidth: 180 });
    doc.text("Firma del Administrador", 50, doc.lastAutoTable.finalY + 40);
    doc.text("Sello de la Empresa", 150, doc.lastAutoTable.finalY + 40);
    doc.line(40, doc.lastAutoTable.finalY + 45, 80, doc.lastAutoTable.finalY + 45);
    doc.line(140, doc.lastAutoTable.finalY + 45, 180, doc.lastAutoTable.finalY + 45);

    // Pie de página
    doc.text(`ChalitaOe © ${new Date().getFullYear()}. Todos los derechos reservados.`, 105, doc.lastAutoTable.finalY + 60, null, null, "center");
    const footerText = "La empresa Capysharks Devs SRL, creadora de ChalitaOe, lleva un registro de todos los datos y reportes generados para garantizar la calidad del servicio.";
    doc.addImage("src/assets/img/companyLogo.png", "PNG", 15, doc.lastAutoTable.finalY + 80, 30, 30); // Logo de la empresa
    doc.setFontSize(8);
    doc.text(footerText, 60, doc.lastAutoTable.finalY + 85, { maxWidth: 180 });

    // Guardar el PDF
    doc.save("grafico_eventos.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const eventData = [
      { tipo: 'Baby Shower', cantidad: 10 },
      { tipo: 'Cumpleaños', cantidad: 5 },
      { tipo: 'Parejas', cantidad: 15 },
      { tipo: 'Fiestas', cantidad: 3 },
    ];

    const worksheet = XLSX.utils.json_to_sheet(eventData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Eventos");

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, "eventos.xlsx");
  };

  return (
    <AdminLayout>
      <div className="w-full flex justify-center py-10">
        <section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          {/* Contenedor para centrar el texto y los botones */}
          <div className="flex justify-between items-center mb-5">
            {/* Contenedor para título centrado */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">Gráfico de los eventos </h1>
            </div>
            {/* Botones para exportar */}
            <div className="flex space-x-4">
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
          </div>

          {/* Contenedor del gráfico que se va a exportar */}
          <div id="events-chart-container">
            <EventsChart />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
