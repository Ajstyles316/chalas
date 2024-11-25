import { useEffect, useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout"
import { UserGrid } from "../components/Users/UserGrid";
import { getUsers } from "../services/getUsers";

export const UsersView = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then(u => setUsers(u))

	}, [])

	return (
		<AdminLayout>
			<div className={`w-full flex justify-center py-10`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md border">
					<h1 className="text-4xl font-bold mb-5 slide-in">Gestion de Clientes</h1>

					{users && <UserGrid users={users} setUsers={setUsers} />}
				</section>
			</div>
		</AdminLayout>
	)
}
