import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { getOrders } from "../services/getOrders";
import { OrdersGrid } from "../components/Orders/OrdersGrid";

export const OrdersView = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders().then(o => setOrders(o));
  }, []);

  // Función para exportar usando la vista de impresión del navegador
  const exportToPDF = () => {
    const printContents = document.getElementById("orders-grid-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `<html><head><title>Órdenes</title></head><body>${printContents}</body></html>`;
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
              <h1 className="text-3xl font-bold text-center slide-in">Gestión de órdenes </h1>
            </div>
            {/* Botón para exportar a PDF */}
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Exportar a PDF
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
