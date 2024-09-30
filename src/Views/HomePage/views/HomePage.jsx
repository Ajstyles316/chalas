
import '../Styles/homePage.css'
import appFirebase from '../../../Firebase/config'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(appFirebase)

export const HomePage = ({userEmail}) =>{
    
    return (
        <>
            <p>Bienvenido {userEmail}</p>
            <button onClick={()=>signOut(auth)}>Cerrar Sesión</button>
        </>
    )
}