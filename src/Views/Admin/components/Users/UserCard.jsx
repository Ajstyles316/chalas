import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";

export const UserCard = ({
  id,
  name,
  email,
  status,
  lastActivity,
  role,
  setUsers,
}) => {
  const handleToggleStatus = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", id));
      const userFB = userDoc.data();
      console.log(userFB);
      const res = await setDoc(doc(db, "users", userFB.uid), {
        ...userFB,
        isActive: !userFB.isActive,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.name === name ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 fade-in">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
      >
        {name}
      </th>

      <td className="px-6 py-4">{email}</td>

      <td className="px-6 py-4">{lastActivity}</td>

      <td className="px-6 py-4">
        <button
          onClick={handleToggleStatus}
          className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${
            !status
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }`}
        >
          {status ? "Deshabilitar" : "Habilitar"}
        </button>
      </td>

      <td className="px-6 py-4 capitalize">{role}</td>
    </tr>
  );
};
