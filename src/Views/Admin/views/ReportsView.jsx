import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { getReports } from "../services/getReports";
import { ReportsGrid } from "../components/Reports/ReportsGrid";

export const ReportsView = () => {
  const [reports, setReports] = useState();
  
  useEffect(() => {
    getReports().then(r => setReports(r));
  }, []);

  // Función para exportar usando la vista de impresión del navegador
  const exportToPDF = () => {
    const printContents = document.getElementById("reports-grid-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `<html><head><title>Reportes</title></head><body>${printContents}</body></html>`;
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
                Gestión de reportes 
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
