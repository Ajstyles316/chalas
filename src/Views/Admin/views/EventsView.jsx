import { EventsChart } from "../components/Events/EventsChart";
import { AdminLayout } from "../layouts/AdminLayout";

export const EventsView = () => {
  // Función para exportar usando la vista de impresión del navegador
  const exportToPDF = () => {
    const printContents = document.getElementById("events-chart-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `<html><head><title>Gráfico de Eventos</title></head><body>${printContents}</body></html>`;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <AdminLayout>
      <div className="w-full flex justify-center py-10">
        <section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
          {/* Contenedor para centrar el texto y el botón */}
          <div className="flex justify-between items-center mb-5">
            {/* Contenedor para título centrado */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center slide-in">
                Gráfico de los eventos
              </h1>
            </div>
            {/* Botón para exportar usando la impresión */}
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Exportar a PDF
            </button>
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
