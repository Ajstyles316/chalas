import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../Firebase/config"

export const getReports = async () => {

	try {
		const data = await getDocs(collection(db, 'complains'))
		const complains = []
		data.forEach(doc => {
			const data = doc.data()
			complains.push({
				...data,
			})
		})

		return complains

	} catch (error) {
		alert(error.code)
	}

}
