import chalitalg from "../../../assets/img/appLogo.jpeg";
import { useNavigate } from "react-router-dom";
import "../styles/component styles/navBar.css";

export const NavBar = () => {
    const navigate = useNavigate();


    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="nvb-cont">
            <div className="navbar-container">
                <div className="lg-cont">
                    <img src={chalitalg} alt="no furulo we" />
                </div>
                <div className="opt-cont">
                    <button onClick={() => navigate("/")}>Inicio</button>
                    <button onClick={() => navigate("/aboutus")}>Sobre Nosotros</button>
                    <button onClick={() => navigate("/contact")}>Contacto</button>
                </div>
                <div className="bt-cont">
                    <button onClick={handleLoginClick}>Iniciar Sesión</button> {/* Agrega el onClick aquí */}
                </div>
            </div>
            <div className="hr-cnt">
                <hr />
            </div>
        </div>
    );
};
