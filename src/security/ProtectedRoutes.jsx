import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";


export const ProtectedRoutes = ({children}) =>{
    const {user, loading} = useAuth();

    if(loading) return <h1>Cargando</h1>

    if(!user) return <Navigate to="/login" />

    return <>{children}</>
}