export const OrdersCard = ({ name_of_client, name_of_store, status, total, delivery_date }) => {
	return (
	  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
		<th scope="row" className="px-6 py-4 text-gray-900 font-medium capitalize">{name_of_client}</th>
		<td className="px-6 py-4 text-gray-700">{name_of_store}</td>
		<td className="px-6 py-4 text-center">
		  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600'}`}>
			{status ? 'Activo' : 'Inactivo'}
		  </span>
		</td>
		<td className="px-6 py-4 text-gray-700">{delivery_date.toDate().toLocaleString()}</td>
		<td className="px-6 py-4 text-gray-900 font-semibold">{total} .</td>
	  </tr>
	);
  };
  