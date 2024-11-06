import logoL from '../../../assets/img/appLogo.jpeg';
import facebook from '../../../assets/svg/facebook.svg';
import gmail from '../../../assets/svg/gmail.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase, { googleProvider, facebookProvider } from '../../../Firebase/config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import '../../../styles config/tailwind.css';
import { ResetPassword } from '../components/ResetPassword';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const Login = () => {
    const [formType, setFormType] = useState('login');
    const [isHuman, setIsHuman] = useState(false);
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
                await setDoc(doc(db, 'client', user.uid), {
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
                const userDocRef = doc(db, 'client', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().isActive) {
                    navigate('/home');
                    return;
                }

                userDocRef = doc(db, 'provider', user.uid);
                userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().isActive) {
                    navigate('/provider'); // Redirige a la vista de proveedor
                    return;
                }

                userDocRef = doc(db, 'admin', user.uid);
                userDoc = await getDoc(userDocRef);
                if (userDoc.exists() && userDoc.data().isActive) {
                    navigate('/admin');
                    return;
                }

                else {
                    setMessage("Error: Cuenta deshabilitada o no encontrada.");
                    setMessageType("error");
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                setMessageType("error");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userDocRef = doc(db, 'client', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    name: user.displayName,
                    email: user.email,
                    role: 'client',
                    createdAt: new Date().toISOString(),
                    isActive: true,
                });
            }
            navigate('/home');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType("error");
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            const userDocRef = doc(db, 'client', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    name: user.displayName,
                    email: user.email,
                    role: 'client',
                    createdAt: new Date().toISOString(),
                    isActive: true,
                });
            }
            navigate('/home');

        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType("error");
        }
    }

    const renderForm = () => {
        if (formType === 'forgotPassword') {
            return <ResetPassword />;
        }

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
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="isHuman"
                        checked={isHuman}
                        onChange={(e) => setIsHuman(e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="isHuman" className="ml-2 text-sm text-gray-700">¿Eres un humano?</label>
                </div>
                <button
                    type="submit"
                    disabled={!isHuman}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isHuman ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                >
                    {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </form>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <img className="w-32 h-32 mx-auto mb-8" src={logoL} alt="ChalitaOE Logo" />
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    {formType === 'login' ? 'Ingresa a ChalitaOE la app de Eventos Sociales' : formType === 'register' ? 'Regístrate en ChalitaOE' : 'Recupera tu contraseña'}
                </h1>

                {renderForm()}

                {formType === 'login' && (
                    <>
                        <div className="text-center mt-6">
                            <button onClick={() => setFormType('forgotPassword')} className="font-medium text-orange-600 hover:text-orange-500">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button onClick={handleGoogleSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <img className="w-5 h-5 mr-2" src={gmail} alt="Google Logo" />
                                    Google
                                </button>
                            </div>
                            <div>
                                <button onClick={handleFacebookSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <img className="w-5 h-5 mr-2" src={facebook} alt="Facebook Logo" />
                                    Facebook
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="font-medium text-gray-500">¿Eres proveedor? <button onClick={() => navigate('/registerprovider')} className="text-orange-600 hover:text-orange-500">Regístrate aquí</button></span>
                        </div>
                    </>
                )}

                <div className="text-center mt-6">
                    {formType === 'login' ? (
                        <span className="text-gray-500">¿No tienes cuenta? <button onClick={() => setFormType('register')} className="font-medium text-orange-600 hover:text-orange-500">Regístrate</button></span>
                    ) : (
                        <span className="text-gray-500">¿Ya tienes cuenta? <button onClick={() => setFormType('login')} className="font-medium text-orange-600 hover:text-orange-500">Inicia sesión</button></span>
                    )}
                </div>
            </div>
        </div>
    );
};
