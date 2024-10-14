import lamaBig from '../../../assets/img/lamaprubea.png';
import logoL from '../../../assets/img/appLogo.jpeg';
import facebook from '../../../assets/svg/facebook.svg';
import gmail from '../../../assets/svg/gmail.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../Firebase/config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import '../styles/login.css';
// import '../../../styles config/tailwind.css'

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase); 

export const Login = () => {
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState(''); // Campo para el nombre
    const [message, setMessage] = useState(''); // Estado para manejar mensajes
    const [messageType, setMessageType] = useState(''); // Estado para manejar el tipo de mensaje

    const authentication = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (register) {
            try {
                
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                
                await setDoc(doc(db, 'users', user.uid), {
                    name: name, 
                    email: email,
                    role: 'client', 
                    createdAt: new Date().toISOString(), 
                });

                navigate('/home');
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                setMessageType("error");
            }
        } else {
            try {
               
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                navigate('/home'); 
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                setMessageType("error");
            }
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="login-container">
            <div className="lm-cont-one">
                <img src={lamaBig} alt="Nofurulowe" />
            </div>
            <div className="lg-cnt">
                <img className='lg-img' src={logoL} alt="Nofurulowe" />
                <h1>Ingresa a ChalitaOE</h1>
                <div className="usr-cnt">
                    <form onSubmit={authentication}>
                        {register && (
                            <input 
                                type="text" 
                                placeholder='Nombre' 
                                id='name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        )}
                        <input type="text" placeholder='Correo electrónico' id='email' required />
                        <div className="psw-text">
                            <a href="">Olvidaste tu contraseña?</a>
                        </div>
                        <input type="password" placeholder='Contraseña' id='password' required />
                        <div className="human-checkbox-container">
                            <label className="human-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="human-checkbox-input"
                                    required
                                />
                                <span className="human-checkbox-custom">
                                    <span className="human-checkbox-letter">X</span>
                                </span>
                                <span className="human-checkbox-text">Eres un Humano</span>
                            </label>
                        </div>
                        <button disabled={!isChecked}>{register ? "Regístrate" : "Iniciar Sesión"}</button>
                    </form>
                </div>
                <div className="lgn-social">
                    <span>Ingresa mediante otros métodos</span>
                    <div className="sc-btn">
                        <img src={facebook} alt="Nofurulowe" />
                        <img src={gmail} alt="Nofurulowe" />
                    </div>
                    <p>¿No tienes una cuenta?</p>
                    <button onClick={() => setRegister(!register)}>{register ? 'Iniciar Sesión' : 'Regístrate'}</button>
                </div>
                {message && (
                    <div className={`p-2 my-4 text-center ${messageType === 'error' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'} rounded-md`}>
                        {message}
                    </div>
                )}
                <h1>La app de eventos sociales</h1>
            </div>
            <div className="lm-cont-two">
                <img src={lamaBig} alt="Nofurulowes" />
            </div>
        </div>
    );
};
