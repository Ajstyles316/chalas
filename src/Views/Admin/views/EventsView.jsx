import { EventsChart } from "../components/Events/EventsChart"
import { AdminLayout } from "../layouts/AdminLayout"

export const EventsView = () => {
	return (
		<AdminLayout>
			<div className={`w-full flex justify-center py-10`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
					<h1 className="text-4xl font-bold mb-5 slide-in">Grafico de los eventos</h1>
					<EventsChart />


				</section>
			</div>

		</AdminLayout>
	)
}
