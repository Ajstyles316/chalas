import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../Firebase/config"
export const getUsers = async () => {

	try {
		const data_client = await getDocs(collection(db, 'client'))
		const users = []
		data_client.forEach(doc => {
			const data = doc.data()
			if (data.name != '') users.push({
				...data,
			})
		}) 
		const data_provider = await getDocs(collection(db, 'provider'))
		data_provider.forEach(doc => {
			const data = doc.data()
			if (data.name != '') users.push({
				...data,
			})
		})

		return users

	} catch (error) {
		alert(error.code)
	}


}
