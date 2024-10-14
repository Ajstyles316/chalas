import { db } from "../../../Firebase/config" 
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import '../../../styles config/tailwind.css'

export const UsersList = () => {
    const [userType, setUserType] = useState('clientes')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users')
            let usersQuery;

            if (userType === 'clientes') {
                usersQuery = query(usersCollection, where('role', '==', 'client'));
            } else {
                usersQuery = query(usersCollection, where('role', '==', 'provider'));
            }

            const userSnapshot = await getDocs(usersQuery)
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Mapear los datos a un formato más usable
            setUsers(userList)
        }

        fetchUsers()
    }, [userType])

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value)
    }

    return (
        <div className="container mx-auto p-4 bg-orange-200">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

            <div className="mb-4">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                    Seleccionar tipo de usuario:
                </label>
                <select
                    id="userType"
                    value={userType}
                    onChange={handleUserTypeChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="clientes">Clientes</option>
                    <option value="proveedores">Proveedores</option>
                </select>
            </div>

            <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                    <li key={user.id} className="py-4 flex">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
