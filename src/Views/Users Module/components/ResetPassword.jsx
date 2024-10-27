import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import appFirebase from "../../../Firebase/config";
import '../../../styles config/tailwind.css';

const auth = getAuth(appFirebase);

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setMessage("Por favor, ingresa tu correo electrónico.");
            setMessageType("error");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
            setMessageType("success");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType("error");
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Recuperar Contraseña</h2>
            <p className="text-gray-600 mb-4 text-center">
                Ingresa tu correo electrónico para recibir un enlace de recuperación de contraseña.
            </p>
            <form onSubmit={handlePasswordReset} className="space-y-6">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-colors duration-200"
                >
                    Enviar enlace de recuperación
                </button>
            </form>
            {message && (
                <div
                    className={`mt-6 p-3 rounded-lg text-center text-lg font-semibold ${
                        messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
