import lamaBig from '../../../assets/img/lamaprubea.png';
import logoL from '../../../assets/img/appLogo.jpeg';
import facebook from '../../../assets/svg/facebook.svg';
import gmail from '../../../assets/svg/gmail.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../Firebase/config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 
import '../styles/login.css';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase); 

export const Login = () => {
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const authentication = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (register) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                // Después de registrar al usuario, puedes también asignarle un rol por defecto si lo deseas
                // Por ejemplo, aquí podrías agregar un rol de cliente a la colección 'roles'
                navigate('/home');
            } catch (error) {
                alert('Asegúrese que la contraseña tenga mínimo 8 caracteres');
            }
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDoc = await getDoc(doc(db, 'roles', user.uid)); 
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === 'admin') {
                        navigate('/admin'); 
                    } else {
                        navigate('/home'); 
                    }
                } else {
                    // Si no tiene rol, se redirige a /home como cliente
                    navigate('/home');
                }
            } catch (error) {
                alert('Correo o Contraseña Incorrectos');
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
                        <input type="text" placeholder='Correo electrónico' id='email' />
                        <div className="psw-text">
                            <a href="">Olvidaste tu contraseña?</a>
                        </div>
                        <input type="password" placeholder='Contraseña' id='password' />
                        <div className="human-checkbox-container">
                            <label className="human-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="human-checkbox-input"
                                />
                                <span className="human-checkbox-custom">
                                    <span className="human-checkbox-letter">X</span>
                                </span>
                                <span className="human-checkbox-text">Eres un Humano</span>
                            </label>
                        </div>
                        <button disabled={!isChecked}>{register ? "Registrate" : "Iniciar Sesión"}</button>
                    </form>
                </div>
                <div className="lgn-social">
                    <span>Ingresa mediante otros métodos</span>
                    <div className="sc-btn">
                        <img src={facebook} alt="Nofurulowe" />
                        <img src={gmail} alt="Nofurulowe" />
                    </div>
                    <p>¿No tienes una cuenta?</p>
                    <button onClick={() => setRegister(!register)}>{register ? 'Iniciar Sesion' : 'Registrate'}</button>
                </div>
                <h1>La app de eventos sociales</h1>
            </div>
            <div className="lm-cont-two">
                <img src={lamaBig} alt="Nofurulowes" />
            </div>
        </div>
    );
};
