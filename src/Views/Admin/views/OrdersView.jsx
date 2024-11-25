import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout"
import { getOrders } from "../services/getOrders";
import { OrdersGrid } from "../components/Orders/OrdersGrid";

export const OrdersView = () => {
	const [orders, setOrders] = useState();
	useEffect(() => {
		getOrders().then(o => setOrders(o));

	}, [])

	return (
		<AdminLayout>
			<div className={`w-full flex justify-center py-10`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
					<h1 className="text-4xl font-bold mb-5 slide-in">Gestion de ordenes</h1>

					{orders && <OrdersGrid orders={orders} />}
				</section>
			</div>
		</AdminLayout>
	)
}
