import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../Firebase/config"

export const getOrders = async () => {

	try {
		const data = await getDocs(collection(db, 'orders'))
		const orders = []
		data.forEach(doc => {
			const data = doc.data()
			orders.push({
				...data,
			})
		})

		return orders

	} catch (error) {
		alert(error.code)
	}

}
