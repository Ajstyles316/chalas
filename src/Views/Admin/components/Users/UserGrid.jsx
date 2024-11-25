import { UserCard } from "./UserCard"

// nombre de usuario
// estado
// ultima actividad
// rol

export const UserGrid = ({ users, setUsers }) => {

	return (
		<div className="overflow-x-auto mt-5">
			<table className="w-full text-left rtl:text-right text-lg">
				<thead className="text-gray-500 font-light ">
					<tr>
						<th scope="col" className="px-6 py-3">Nombre</th>
						<th scope="col" className="px-6 py-3">Correo</th>
						<th scope="col" className="px-6 py-3">Ultima actividad</th>
						<th scope="col" className="px-6 py-3">Gestión</th>
						<th scope="col" className="px-6 py-3">Rol</th>
					</tr>
				</thead>
				<tbody>

					{
						users.map(user => <UserCard
							key={user.uid}
							id={user.uid}
							name={user.name?user.name:user.firstName}
							email={user.email}
							lastActivity={user.createdAt}
							role={user.role}
							status={user.isActive}
							setUsers={setUsers}
						/>)
					}
				</tbody>
			</table>
		</div>
	)
}

