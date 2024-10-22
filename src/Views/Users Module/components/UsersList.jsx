import { db } from "../../../Firebase/config"; 
import { useEffect, useState } from "react"; 
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore"; 
import '../../../styles config/tailwind.css';

export const UsersList = () => {
    const [userType, setUserType] = useState('clientes');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            let usersQuery;

            if (userType === 'clientes') {
                usersQuery = query(usersCollection, where('role', '==', 'client'));
            } else {
                usersQuery = query(usersCollection, where('role', '==', 'provider'));
            }

            const userSnapshot = await getDocs(usersQuery);
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };

        fetchUsers();
    }, [userType]);

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const toggleActiveStatus = async (user) => {
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, { isActive: !user.isActive });
        setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
    };

    return (
        <div className="container mx-auto p-6 bg-orange-200 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Lista de Usuarios</h1>

            <div className="mb-6 flex justify-center">
                <label htmlFor="userType" className="mr-4 text-lg font-medium text-gray-700">
                    Tipo de usuario:
                </label>
                <select
                    id="userType"
                    value={userType}
                    onChange={handleUserTypeChange}
                    className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="clientes">Clientes</option>
                    <option value="proveedores">Proveedores</option>
                </select>
            </div>

            <ul className="divide-y divide-gray-300">
                {users.map((user) => (
                    <li key={user.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="ml-3">
                                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className={`text-sm ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.isActive ? 'Activo' : 'Deshabilitado'}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleActiveStatus(user)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    user.isActive
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                } transition duration-200`}
                            >
                                {user.isActive ? 'Deshabilitar' : 'Habilitar'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
