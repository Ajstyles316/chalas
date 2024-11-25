
export const ReportsCard = ({ name, rol, tel, type, date }) => {

	return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{name}</th>
			<td className="px-6 py-4 capitalize">{rol}</td>
			<td className="px-6 py-4">{tel}</td>
			<td className="px-6 py-4 uppercase">{type}</td>
			<td className="px-6 py-4">{date.toDate().toLocaleString()}</td>
		</tr>
	)
}
