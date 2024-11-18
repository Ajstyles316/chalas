import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const AdminLayout = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Navbar />
			<main className="flex w-full pt-20 xl:pt-24 overflow-hidden">
				<Sidebar />
				<section className="flex flex-col w-full ml-20 bg-secondary/60 pl-24 min-h-screen">
					{children}
				</section>
			</main>
		</div>
	)
}
