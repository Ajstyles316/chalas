
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
                    <button><a href="/">Inicio</a></button>
                    <button><a href="/aboutus">Sobre Nosotros</a></button>
                    <button><a href="/contact">Contacto</a></button>
                </div>
                <div className="bt-cont">
                    <button><a href="https://chalitaoe.netlify.app/login" target="_blank">Inicio de sesión</a></button>
                </div>
            </div>
            <hr />
        </>
    )
}