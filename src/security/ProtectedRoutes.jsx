import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
  
    if (loading) return <h1>Cargando...</h1>;
  
    // Si no hay usuario, redirige al login
    if (!user) return <Navigate to="/login" replace />;
  
    // Si el rol no es permitido, redirige a la página de inicio
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
  
    return <>{children}</>;
};
