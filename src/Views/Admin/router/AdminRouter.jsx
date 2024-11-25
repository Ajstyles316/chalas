import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UsersView } from "../views/UsersView"

import '../index.css'
import { EventsView } from "../views/EventsView"
import { OrdersView } from "../views/OrdersView"
import { ReportsView } from "../views/ReportsView"

export const AdminRouter = () => {
	const routes = createBrowserRouter([
		{
			path: '/',
			element: <UsersView />
		},
		{
			path: '/orders',
			element: <OrdersView />

		},
		{
			path: '/events',
			element: <EventsView />
		},
		{
			path: '/reports',
			element: <ReportsView />
		}
	])
	return (
		<>
			<RouterProvider router={routes} />
		</>

	)
}
