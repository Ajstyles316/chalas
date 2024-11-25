import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi"; // Usaremos iconos de react-icons

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@chalitaoe.com"); // Correo inicial del administrador
  const [password, setPassword] = useState(""); // Contraseña actual
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Función para mostrar el formulario de perfil
  const showProfileForm = () => {
    setIsProfileFormVisible(true);
    setIsMenuOpen(false); // Cierra el menú al abrir el formulario
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLogoutConfirmationVisible(true); // Muestra el cuadro de confirmación
    setIsMenuOpen(false); // Cierra el menú al pedir confirmación
  };

  // Función para confirmar el cierre de sesión
  const confirmLogout = () => {
    setIsLogoutConfirmationVisible(false); // Oculta la confirmación
    console.log("Cerrando sesión...");
    // Aquí podrías agregar la lógica real para cerrar sesión, por ejemplo:
    // redirigir al login o borrar datos de sesión
  };

  // Función para cancelar el cierre de sesión
  const cancelLogout = () => {
    setIsLogoutConfirmationVisible(false); // Cancela la confirmación
  };

  // Función para manejar los cambios del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo correo del administrador:", adminEmail);
    console.log("Contraseña ingresada:", password);
    setIsProfileFormVisible(false); // Cierra el formulario después de guardar
  };

  return (
    <header className="flex bg-white px-3 h-16 xl:h-20 2xl:h-24 shadow-md w-full sm:px-10 xl:px-40 items-center fixed z-10 justify-between">
      <NavLink
        to="/"
        className="navlink font-bold sm:text-3xl xl:text-3xl hover:text-gray-900 uppercase text-left m-0 leading-none flex items-center gap-3"
      >
        <img className="w-20 h-20" src="/llama.png" alt="Logo" />
        <p>Chalita Oe</p>
      </NavLink>

      <div className="flex items-center gap-3 relative">
        {/* Ícono circular de perfil con forma de persona */}
        <svg
          onClick={toggleMenu} // Al hacer clic se alterna el menú
          className="w-12 h-12 text-white cursor-pointer rounded-full border-2 border-gray-300 p-2 hover:scale-105 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Círculo exterior en naranja */}
          <circle cx="12" cy="12" r="10" fill="#FF5722" /> {/* Color naranja de fondo */}
          {/* Cabeza (círculo dentro del cuerpo) */}
          <circle cx="12" cy="8" r="4" fill="#FFC107" /> {/* Color amarillo para la cabeza */}
          {/* Cuerpo */}
          <path d="M12 12c2 2 2 6 2 6H10s0-4 2-6z" fill="#FF5722" /> {/* Cuerpo en color naranja */}
        </svg>

        {/* Menú desplegable del perfil */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-3 transition-all ease-in-out duration-300">
            <ul className="text-gray-700">
              <li
                onClick={showProfileForm}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition-all"
              >
                <FiUser className="text-xl text-gray-600" /> Ver perfil
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition-all"
              >
                <FiLogOut className="text-xl text-gray-600" /> Cerrar sesión
              </li>
            </ul>
          </div>
        )}

        {/* Correo del administrador */}
        <p className="hidden sm:block">{adminEmail}</p>
      </div>

      {/* Formulario de perfil */}
      {isProfileFormVisible && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 mt-3 w-72 bg-white shadow-lg rounded-lg border p-6 transition-all ease-in-out duration-300">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">Editar Perfil</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm text-gray-600">Correo del administrador</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)} // Actualiza el correo del administrador
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Nuevo correo del administrador"
            />
            <label className="text-sm text-gray-600">Ingresar contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza la contraseña
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Contraseña actual"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md mt-3 hover:bg-blue-600 transition-all"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      )}

      {/* Confirmación de cierre de sesión */}
      {isLogoutConfirmationVisible && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 mt-3 w-72 bg-white shadow-lg rounded-lg border p-6 transition-all ease-in-out duration-300">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">¿Estás seguro?</h3>
          <p className="text-sm text-gray-600 mb-3">¿Quieres cerrar sesión?</p>
          <div className="flex justify-between">
            <button
              onClick={confirmLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Sí
            </button>
            <button
              onClick={cancelLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              No
            </button>
          </div>
        </div>
      )}
    </header>
  );
}; 