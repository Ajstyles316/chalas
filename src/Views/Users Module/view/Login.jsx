import logoL from '../../../assets/img/appLogo.jpeg';
import facebook from '../../../assets/svg/facebook.svg';
import gmail from '../../../assets/svg/gmail.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../Firebase/config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import '../../../styles config/tailwind.css';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const Login = () => {
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const authentication = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;

        if (formType === 'register') {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    email: email,
                    role: 'client',
                    createdAt: new Date().toISOString(),
                    isActive: true,
                });

                navigate('/home');
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                setMessageType("error");
            }
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    if (userData.isActive) {
                        navigate('/home');
                    } else {
                        setMessage("Error: La cuenta está deshabilitada.");
                        setMessageType("error");
                    }
                } else {
                    setMessage("Error: No se encontró la cuenta.");
                    setMessageType("error");
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                setMessageType("error");
            }
        }
    };

    const handlePasswordReset = async () => {
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
    };

    const navigateToProviderRegistration = () => {
        navigate('/registerprovider');
    };

    const renderForm = () => {
        switch (formType) {
            case 'login':
                return (
                    <form onSubmit={authentication} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Iniciar Sesión
                        </button>
                    </form>
                );
            case 'register':
                return (
                    <form onSubmit={authentication} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Registrarse
                        </button>
                    </form>
                );
            case 'forgotPassword':
                return (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <button onClick={handlePasswordReset} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Recuperar Contraseña
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <img className="w-20 h-20 mx-auto mb-5" src={logoL} alt="ChalitaOE Logo" />
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    {formType === 'login' ? 'Ingresa a ChalitaOE' : formType === 'register' ? 'Regístrate en ChalitaOE' : 'Recupera tu contraseña'}
                </h1>

                {renderForm()}

                {formType === 'login' && (
                    <>
                        <div className="text-center mt-6">
                            <button onClick={() => setFormType('forgotPassword')} className="font-medium text-purple-600 hover:text-purple-500">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">O continúa con</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div>
                                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <img className="h-5 w-5" src={facebook} alt="Facebook" />
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <img className="h-5 w-5" src={gmail} alt="Gmail" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                ¿No tienes una cuenta?{' '}
                                <button onClick={() => setFormType('register')} className="font-medium text-purple-600 hover:text-purple-500">
                                    Regístrate aquí
                                </button>
                            </p>
                        </div>

                        <div className="text-center mt-6">
                            <button onClick={navigateToProviderRegistration} className="font-medium text-purple-600 hover:text-purple-500">
                                ¿Eres proveedor? ¡Haz clic aquí!
                            </button>
                        </div>
                    </>
                )}

                {(formType === 'register' || formType === 'forgotPassword') && (
                    <div className="text-center mt-6">
                        <button onClick={() => setFormType('login')} className="font-medium text-purple-600 hover:text-purple-500">
                            Volver al inicio de sesión
                        </button>
                    </div>
                )}

                {message && (
                    <div className={`p-2 mt-4 text-center ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md`}>
                        {message}
                    </div>
                )}

                <h2 className="text-xl font-medium text-primary mt-6 text-center">
                    La app de eventos sociales
                </h2>
            </div>
        </div>
    );
};