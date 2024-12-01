import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";

// Función para traducir el rol de inglés a español
const translateRole = (role) => {
  switch(role) {
    case 'client':
      return 'Cliente';
    case 'provider':
      return 'Proveedor';
    default:
      return role; // Si es otro rol, lo dejamos tal cual
  }
};

export const UserCard = ({ id, name, email, status, lastActivity, role, setUsers }) => {

  const handleToggleStatus = async () => {
    try {
      if(role === "client"){
        const clientDoc = await getDoc(doc(db, 'client', id));
        const clientFB = clientDoc.data();
        
        await setDoc(doc(db, 'client', clientFB.uid), {
          ...clientFB,
          isActive: !clientFB.isActive,
        });
      } else if(role === "provider"){
        const providerDoc = await getDoc(doc(db, 'provider', id));
        const providerFB = providerDoc.data();
        
        await setDoc(doc(db, 'provider', providerFB.uid), {
          ...providerFB,
          isActive: !providerFB.isActive,
        });
      }

      // Actualizar la UI con el nuevo estado
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === id ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <tr className={`bg-white hover:bg-gray-50 border-b-2 ${status ? 'border-green-300' : 'border-red-300'} transition duration-300`}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
        {name}
      </th>

      <td className="px-6 py-4">{email}</td>

      <td className="px-6 py-4">{lastActivity}</td>

      <td className="px-6 py-4">
        <button
          onClick={handleToggleStatus}
          className={`px-4 py-2 text-xs font-semibold rounded-full cursor-pointer transition duration-300 transform hover:scale-105 ${!status
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {status ? "Deshabilitar" : "Habilitar"}
        </button>
      </td>

      <td className="px-6 py-4 capitalize">{translateRole(role)}</td>
    </tr>
  );
};
