
import chalitalg from "../../../assets/img/appLogo.jpeg"
import "../styles/component styles/navBar.css"

export const NavBar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="lg-cont">
                    <img src={chalitalg} alt="no furulo we" />
                </div>
                <div className="opt-cont">
                    <span>Inicio</span>
                    <span>Sobre Nosotros</span>
                    <span>Contacto</span>
                </div>
                <div className="bt-cont">
                    <button>Inicio de sesión</button>
                </div>
            </div>
        </>
    )
}