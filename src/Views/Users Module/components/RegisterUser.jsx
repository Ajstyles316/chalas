import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../../context/AuthContext";

export const RegisterUser = ({ onSuccess }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      onSuccess(); // Llamar esta función al finalizar el registro exitosamente
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-4 text-white rounded ${
            messageType === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <div className="flex items-center mt-4">
          <ReCAPTCHA
            sitekey="6Ld134EqAAAAAGDUQXhbFtodSTi8jzJrrwI_bCUz"
            onChange={() => setIsHuman(true)}
          />
        </div>
        <button
          type="submit"
          disabled={!isHuman}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
