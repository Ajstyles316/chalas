
import lamaBig from '../../../assets/img/lamaprubea.png'
import logoL from '../../../assets/img/appLogo.jpeg'
import facebook from '../../../assets/svg/facebook.svg'
import gmail from '../../../assets/svg/gmail.svg'
import {useState} from 'react'
import appFirebase from '../../../Firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import '../styles/login.css'
const auth = getAuth(appFirebase)

export const Login = () => {

    const[register, setRegister] = useState(false)

    const authentication = async(e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(register){
            try{
                await createUserWithEmailAndPassword(auth, email, password);
            }
            catch(error){
                alert('Asegúrese que la contraseña tenga mínimo 8');
            }
        }
        else{
            try{
                await signInWithEmailAndPassword(auth, email, password);
            }
            catch(error){
                alert('Correo o Contraseña Incorrectos');
            }
        }
    }


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
                        <span>Correo</span>
                        <input type="text" placeholder='Correo electrónico'id='email'/>
                        <div className="psw-text">
                            <span>Contraseña</span>
                            <a href="">Olvidaste tu contraseña?</a>
                        </div>
                        <input type="password" placeholder='Contraseña' id='password'/>
                        <button>{register ? "Registrate" : "Iniciar Sesión"}</button>
                    </form>
                </div>
                <div className="lgn-social">
                    <span>Ingresa mediante otros métodos</span>
                    <div className="sc-btn">
                        <img src={facebook} alt="Nofurulowe" />
                        <img src={gmail} alt="Nofurulowe" />
                    </div>
                    <p>¿No tienes una cuenta?</p>
                    <button onClick={()=>setRegister(!register)}>{register ? 'Registrarse' : 'Iniciar Sesion'}</button> {/*<a href="">Regístrate aquí</a>} */}
                </div>
            </div>
            <div className="lm-cont-two">
                <img src={lamaBig} alt="Nofurulowes" />
            </div>
        </div>
    )
}