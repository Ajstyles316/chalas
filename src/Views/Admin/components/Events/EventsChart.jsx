import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const EventsChart = () => {
  // Datos del gráfico
  const data = [
    { tipo: "Baby Shower", cantidad: 10 },
    { tipo: "Cumpleaños", cantidad: 5 },
    { tipo: "Parejas", cantidad: 15 },
    { tipo: "Fiestas", cantidad: 3 },
  ];

  return (
    <BarChart
      width={1200}
      height={500}
      data={data} // Conjunto de datos
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      {/* Opciones de diseño */}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="tipo"
        label={{ value: "Tipo de evento", position: "insideBottom", dy: 10 }}
      />
      <YAxis
        label={{
          value: "Cantidad de eventos",
          angle: -90,
          position: "insideLeft",
          dx: -10,
        }}
      />
      <Tooltip />
      <Legend />

      {/* Barra */}
      <Bar dataKey="cantidad" fill="#8884d8" barSize={40} />
    </BarChart>
  );
};
