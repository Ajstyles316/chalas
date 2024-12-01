import facebook from '../../../assets/svg/facebook.svg';
import instagram from '../../../assets/svg/instagram.svg';
import twitter from '../../../assets/svg/twitter.svg';
import capyLogo from '../../../assets/img/companyLogo.png';

export const Footer = () => {
    return (
        <div className="w-full font-tittles">
            {/* Main Footer Content */}
            <div className="flex flex-col items-center justify-evenly text-white bg-[rgba(151,95,124,1)] 
                lg:flex-row lg:h-[200px]">
                
                {/* Services Section */}
                <div className="flex flex-col pt-5 text-center lg:pt-0">
                    <span className="text-lg font-bold">Servicios</span>
                    <div className="flex flex-col pt-5 space-y-2">
                        <span className="hover:font-bold hover:cursor-pointer">Eventos Sociales</span>
                        <span className="hover:font-bold hover:cursor-pointer">Venta de productos</span>
                        <span className="hover:font-bold hover:cursor-pointer">Marketing</span>
                    </div>
                </div>

                {/* Company Section */}
                <div className="flex flex-col pt-5 text-center lg:pt-0">
                    <span className="text-lg font-bold">Compañía</span>
                    <div className="flex flex-col pt-5 space-y-2">
                        <span className="hover:font-bold hover:cursor-pointer">Inicio</span>
                        <span className="hover:font-bold hover:cursor-pointer">Sobre Nosotros</span>
                        <span className="hover:font-bold hover:cursor-pointer">Contáctanos</span>
                    </div>
                </div>

                {/* Social Section */}
                <div className="flex flex-col pt-5 text-center lg:pt-0">
                    <span className="text-lg font-bold">Social</span>
                    <span className="pt-2">@ChalitaOe</span>
                    <div className="flex items-center justify-center pt-5 space-x-3">
                        <img src={instagram} alt="Instagram" className="hover:cursor-pointer" />
                        <img src={facebook} alt="Facebook" className="w-[30px] h-[30px] hover:cursor-pointer" />
                        <img src={twitter} alt="Twitter" className="hover:cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="flex  items-center justify-center py-5 text-center space-y-2">
                <img src={capyLogo} alt="CapyLogo" className="w-20 h-20" />
                <span>
                    © 2024 Desarrollado por{' '}
                    <a
                        href="https://main--capysharksdevs.netlify.app/"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noopener noreferrer"
                    >
                        CapySharks Dev SRL
                    </a>{' '}
                    Empresa de Desarrollo de Software
                </span>
            </div>
        </div>
    );
};
