import appFirebase from "../../../Firebase/config"
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router";

const auth = getAuth(appFirebase);

export const Admin = () => {

    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/'); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Ocurrió un error al cerrar sesión");
        }
    }
    return (
        <>
            <p>Bienvenido ADMINISTRADOR!</p>
            <button onClick={handleSignOut}>Cerrar Sesión</button>
        </>
    )
}