import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { getReports } from "../services/getReports";
import { ReportsGrid } from "../components/Reports/ReportsGrid";

export const ReportsView = () => {
    const [reports, setReports] = useState();

    useEffect(() => {
        getReports().then(r => setReports(r));
    }, []);

    const exportToPDF = () => {
        const element = document.getElementById("export-section"); // Elemento a exportar
        const printWindow = window.open("", "_blank"); // Crear una nueva ventana
        if (printWindow) {
            printWindow.document.write("<html><head><title>Exportar PDF</title></head><body>");
            printWindow.document.write(element.outerHTML); // Copiar el contenido del elemento
            printWindow.document.write("</body></html>");
            printWindow.document.close();
            printWindow.focus();
            printWindow.print(); // Abrir diálogo de impresión
            printWindow.close();
        }
    };

    return (
        <AdminLayout>
            <div className="w-full flex justify-center py-10">
                <section
                    id="export-section"
                    className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-4xl font-bold slide-in">Gestión de quejas</h1>
                        <button
                            onClick={exportToPDF}
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                        >
                            Exportar a PDF
                        </button>
                    </div>
                    {reports && <ReportsGrid reports={reports} />}
                </section>
            </div>
        </AdminLayout>
    );
};
