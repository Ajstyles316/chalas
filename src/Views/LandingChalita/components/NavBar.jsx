import chalitalg from "../../../assets/img/appLogo.jpeg";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full p-5 font-tittles font-normal 
                md:flex-row md:justify-between md:px-10 md:py-5
                xl:h-[150px] xl:justify-center xl:gap-[150px] xl:p-0">

                {/* Logo Container */}
                <div className="w-[100px] h-[100px] mb-5 
                    sm:w-[120px] sm:h-[120px] 
                    lg:w-[150px] lg:h-[150px] lg:mb-0">
                    <button>
                        <img src={chalitalg} alt="no furulo we" className="w-full" onClick={() => navigate('/')}/>
                    </button>
                </div>

                {/* Options Container */}
                <div className="flex flex-col items-center gap-2.5 
                    md:flex-row md:gap-4 
                    lg:gap-6">
                    <button
                        onClick={() => navigate("/")}
                        className="w-[150px] h-[30px] text-base rounded-full bg-white border-none hover:bg-gray-300 cursor-pointer 
                            md:w-[180px] md:h-[35px] md:text-lg
                            xl:w-[200px] xl:h-[40px] xl:text-xl"
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => navigate("/aboutus")}
                        className="w-[150px] h-[30px] text-base rounded-full bg-white border-none hover:bg-gray-300 cursor-pointer 
                            md:w-[180px] md:h-[35px] md:text-lg
                            xl:w-[200px] xl:h-[40px] xl:text-xl"
                    >
                        Sobre Nosotros
                    </button>
                    <button
                        onClick={() => navigate("/contact")}
                        className="w-[150px] h-[30px] text-base rounded-full bg-white border-none hover:bg-gray-300 cursor-pointer 
                            md:w-[180px] md:h-[35px] md:text-lg
                            xl:w-[200px] xl:h-[40px] xl:text-xl"
                    >
                        Contacto
                    </button>
                </div>

                {/* Login Button Container */}
                <div className="mt-5 
                    md:mt-0 
                    lg:w-[250px] lg:h-[70px]">
                    <button
                        onClick={handleLoginClick}
                        className="w-[200px] h-[50px] text-lg rounded-full bg-yellow-400 hover:bg-gray-300 cursor-pointer 
                            md:w-[220px] md:h-[55px] md:text-xl 
                            lg:w-full lg:h-full lg:text-2xl lg:shadow-md"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full flex justify-center items-center">
                <hr className="w-[90%] bg-black h-[2px] my-5 
                    sm:w-[95%] 
                    lg:w-[1200px] 
                    xl:w-[1350px]" />
            </div>
        </div>
    );
};
