
export const OrdersCard = ({ name_of_client, name_of_store, status, total, delivery_date }) => {



	return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{name_of_client}</th>
			<td className="px-6 py-4">{name_of_store}</td>
			<td className="px-6 py-4">{status ? 'Activo' : 'Inactivo'}</td>
			<td className="px-6 py-4">{delivery_date.toDate().toLocaleString()}</td>
			<td className="px-6 py-4">{total} Bs</td>
		</tr>
	)
}
