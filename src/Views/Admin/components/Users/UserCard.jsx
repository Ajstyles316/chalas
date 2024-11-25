import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";

export const UserCard = ({ id, name, email, status, lastActivity, role, setUsers }) => {

	
console.log(name)
	const handleToggleStatus = async () => {
		try {
			if(role === "client"){
				const clientDoc = await getDoc(doc(db, 'client', id))
				const clientFB = clientDoc.data()
				
				const res = await setDoc(doc(db, 'client', clientFB.uid), {
					...clientFB,
					isActive: !clientFB.isActive,
				})
				

			}else if(role==="provider"){
				const providerDoc = await getDoc(doc(db, 'provider', id))
				const providerFB = providerDoc.data()
				console.log(providerFB);
				const res = await setDoc(doc(db, 'provider', providerFB.uid), {
					...providerFB,
					isActive: !providerFB.isActive,
				})
				
				

			} 
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.uid === id
						? { ...user, isActive: !user.isActive }
						: user
				)
			);
			
			






			


		} catch (e) {
			console.error(e);
		}
	};

	return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
				{name}
			</th>

			<td className="px-6 py-4">{email}</td>

			<td className="px-6 py-4">{lastActivity}</td>

			<td className="px-6 py-4">
				<button
					onClick={handleToggleStatus}
					className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${!status
						? "bg-green-100 text-green-800 hover:bg-green-200"
						: "bg-red-100 text-red-800 hover:bg-red-200"
						}`}
				>
					{status ? "Deshabilitar" : "Habilitar"}
				</button>
			</td>

			<td className="px-6 py-4 capitalize">{role}</td>

		</tr>
	);
};

