import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout"
import { getReports } from "../services/getReports";
import { ReportsGrid } from "../components/Reports/ReportsGrid";

export const ReportsView = () => {
	const [reports, setReports] = useState();
	useEffect(() => {
		getReports().then(r => setReports(r));

	}, [])

	return (
		<AdminLayout>
			<div className={`w-full flex justify-center py-10`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
					<h1 className="text-4xl font-bold mb-5 slide-in">Gestión de quejas</h1>

					{reports && <ReportsGrid reports={reports} />}
				</section>
			</div>
		</AdminLayout>
	)
}
