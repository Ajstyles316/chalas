import React, { useEffect, useRef, useState } from "react";
import "../Styles/profile.css";
import profile from "../../../assets/img/llama_chill.png";
import { User, Settings, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth"; // Importa Firebase Auth
import { useNavigate } from "react-router-dom"; // Para redirigir al Login
import { useUser } from "../../../Firebase/UserContext"; // Importa el UserContext

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, error, fetchUserData } = useUser(); // Consumiendo fetchUserData desde el contexto
  const menuRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  // Cargar datos del usuario desde localStorage si es necesario
  useEffect(() => {
    const cachedUser = localStorage.getItem("userData");
    if (cachedUser && !user) {
      fetchUserData(JSON.parse(cachedUser)); // Cargar los datos desde localStorage si no están en el contexto
    }
  }, [fetchUserData, user]);

  // Cerrar el menú si se hace clic fuera
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Cerrar sesión
      localStorage.removeItem("userData"); // Limpiar los datos del usuario en localStorage
      setOpen(false); // Cerrar el menú de opciones
      navigate("/login"); // Redirigir al Login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const menuItems = [
    { label: "Mi perfil", icon: <User /> },
    { label: "Configuración", icon: <Settings /> },
    { label: "Cerrar sesión", icon: <LogOut />, onClick: handleLogout }, // Agregar la función para cerrar sesión
  ];

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos del usuario: {error}</div>;
  }

  return (
    <div className="user-profile">
      <img
        ref={imgRef}
        onClick={() => setOpen(!open)}
        src={profile}
        alt="user"
        className="user-image"
      />
      {open && (
        <div ref={menuRef} className="options">
          <h3 className="user-name">{user ? user.firstName : "Cargando..."}</h3>
          <span className="user-role">{user ? user.role : "Proveedor"}</span>
          <ul>
            {menuItems.map((item) => (
              <li key={item.label} onClick={item.onClick}>
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
