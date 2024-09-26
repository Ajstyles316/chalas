
import facebook from '../../../assets/svg/facebook.svg'
import instagram from '../../../assets/svg/instagram.svg'
import tiktok from '../../../assets/svg/tiktok.svg'

export const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <div className="services-cnt">
                    <span>Servicios</span>
                    <div className="services">
                        <span>Eventos Sociales</span>
                        <span>Venta de productos</span>
                        <span>Marketing</span>
                    </div>
                </div>
                <div className="company-cnt">
                    <span>Compañía</span>
                    <div className="company">
                        <span>Inicio</span>
                        <span>Sobre Nosotros</span>
                        <span>Contáctanos</span>
                    </div>
                </div>
                <div className="social-cnt">
                    <span>Social</span>
                    <span>@ChalitaOe</span>
                    <div className="social">
                        <img src={instagram} alt="nofurulowe" />
                        <img src={facebook} alt="nofurulowe" />
                        <img src={tiktok} alt="nofurulowe" />
                    </div>
                </div>
            </div>
            <div className="copy-cont">
                <span>© 2024 Creado por CapySharks Dev SRL</span>
            </div>
        </>
    )
}