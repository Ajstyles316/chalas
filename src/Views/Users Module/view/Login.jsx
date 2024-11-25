import logoL from "../../../assets/img/appLogo.jpeg";
import facebook from "../../../assets/svg/facebook.svg";
import gmail from "../../../assets/svg/gmail.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles config/tailwind.css";
import { ResetPassword } from "../components/ResetPassword";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../../context/AuthContext";
import { UserTerms } from "../components/UserTerms";

export const Login = () => {
  const { login, register, signInWithGoogle, signInWithFacebook, resetPassword } = useAuth();
  const [formType, setFormType] = useState("login");
  const [isHuman, setIsHuman] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const navigate = useNavigate();

  const authentication = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    try {
      if (formType === "register") {
        await register(email, password);
        navigate("/clienthome");
      } else {
        await login(email, password);
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/clienthome");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate("/clienthome");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const renderForm = () => {
    if (formType === "forgotPassword") {
      return <ResetPassword resetPassword={resetPassword} />;
    }

    return (
      <form onSubmit={authentication} className="space-y-4">
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
          <ReCAPTCHA sitekey="6Ld134EqAAAAAGDUQXhbFtodSTi8jzJrrwI_bCUz" onChange={() => setIsHuman(true)} />
        </div>
        <div className="flex items-center mt-4">
          <input
            required
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-6 w-6  rounded-sm text-orange-600 m-2 "
          />
          <button
            type="button"
            onClick={() => setShowTerms(true)} // Abre el modal con términos si es necesario
            className="text-orange-600 underline hover:text-orange-500"
          >
            Términos y Condiciones
          </button>
        </div>

        <button
          type="submit"
          disabled={!isHuman}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
        >
          {formType === "login" ? "Iniciar Sesión" : "Registrarse"}
        </button>
        {showTerms && <UserTerms />}
      </form>

    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <img className="w-32 h-32 mx-auto mb-8" src={logoL} alt="ChalitaOE Logo" />
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          {formType === "login"
            ? "Ingresa a ChalitaOE la app de Eventos Sociales"
            : formType === "register"
              ? "Regístrate en ChalitaOE"
              : "Recupera tu contraseña"}
        </h1>

        {message && (
          <div
            className={`mb-4 p-4 text-white rounded ${messageType === "error" ? "bg-red-500" : "bg-green-500"
              }`}
          >
            {message}
          </div>
        )}
        {renderForm()}

        {formType === "login" && (
          <>
            <div className="text-center mt-6">
              <button
                onClick={() => setFormType("forgotPassword")}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img className="w-5 h-5 mr-2" src={gmail} alt="Google Logo" />
                  Google
                </button>
              </div>
              <div>
                <button
                  onClick={handleFacebookSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img className="w-5 h-5 mr-2" src={facebook} alt="Facebook Logo" />
                  Facebook
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="font-medium text-gray-500">
                ¿Eres proveedor?{" "}
                <button
                  onClick={() => navigate("/registerprovider")}
                  className="text-orange-600 hover:text-orange-500"
                >
                  Regístrate aquí
                </button>
              </span>
            </div>
          </>
        )}

        <div className="text-center mt-6">
          {formType === "login" ? (
            <span className="text-gray-500">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setFormType("register")}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Regístrate
              </button>
            </span>
          ) : (
            <span className="text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setFormType("login")}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Inicia sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};