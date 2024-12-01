import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList } from 'recharts';

export const EventsChart = () => {
  // Datos del gráfico
  const data = [
    { tipo: 'Baby Shower', cantidad: 10 },
    { tipo: 'Cumpleaños', cantidad: 5 },
    { tipo: 'Parejas', cantidad: 15 },
    { tipo: 'Fiestas', cantidad: 3 },
  ];

  return (
    <BarChart
      width={1200}
      height={500}
      data={data} // Conjunto de datos
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      {/* Opciones de diseño */}
      <CartesianGrid stroke="#555555" strokeDasharray="4 4" /> {/* Líneas punteadas en gris oscuro */}
      <XAxis 
        dataKey="tipo" 
        stroke="#555555" // Eje X en gris oscuro
        label={{
          value: "Tipo de evento",
          position: "insideBottom",
          dy: 10,
          style: { fill: "#000000", fontSize: 14, fontWeight: "bold" }, // Texto en negro y negrilla
        }} 
      />
      <YAxis 
        stroke="#555555" // Eje Y en gris oscuro
        label={{
          value: "Cantidad de eventos",
          angle: -90,
          position: "insideLeft",
          dx: -10,
          style: { fill: "#000000", fontSize: 14, fontWeight: "bold" }, // Texto en negro y negrilla
        }} 
      />
      <Legend verticalAlign="top" height={36} /> {/* Coloca la leyenda arriba */}

      {/* Barra con etiquetas */}
      <Bar 
        dataKey="cantidad" 
        fill="#8884d8" // Color morado
        barSize={40}
      >
        <LabelList 
          dataKey="cantidad" 
          position="top" 
          style={{ fill: '#000000', fontSize: 14, fontWeight: 'bold' }} // Etiquetas en negrilla
        />
      </Bar>
    </BarChart>
  );
};
