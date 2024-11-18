import { useEffect, useRef } from 'react';
import { Bar } from "react-roughviz";

export const EventsChart = () => {

	return (
		<Bar
			className="fade-in"
			title="Eventos"
			data={{
				labels: ['Baby Shower', 'Cumpleanos', 'Parejas', 'Fiestas'],
				values: [10, 5, 15, 3],
			}}
			width={1200}
			height={500}
			roughness={1}

			labels='flavor'
			values='price'
			strokeWidth={2}
			xLabel="Tipo de evento"
			yLabel="Cantidad de eventos"
			axisFontSize='1.1rem'
		/>
	);
};

