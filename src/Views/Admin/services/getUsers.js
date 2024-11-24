import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../Firebase/config"
export const getUsers = async () => {

	try {
		const data = await getDocs(collection(db, 'users'))
		const users = []
		data.forEach(doc => {
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
