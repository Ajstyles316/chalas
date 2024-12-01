import { parragraphsHome } from './parragraphs';
import lamaG from "../../../assets/img/llama_lentes.png";
import lamaBan from "../../../assets/img/llama_banio.png";
import lamaComp from "../../../assets/img/llama_pep.png";

export const LandingHomeBody = () => {
    return (
        <div className="flex flex-col items-center justify-center p-0 m-0 w-full">
            <h1 className="font-tittles text-4xl sm:text-5xl p-0 m-0">
                ChalitaOE
            </h1>

            {/* Primera sección */}
            <div className="flex flex-col sm:flex-row items-center justify-around w-full max-w-screen-lg my-6">
                <p className="text-lg sm:text-2xl font-light leading-relaxed w-full sm:w-1/2">
                    {parragraphsHome.homeP1}
                </p>
                <div className="relative w-full sm:w-1/2 flex justify-center">
                    <div className="absolute top-0 right-0 w-3/4 h-full bg-[#FF9F87] rounded-lg"></div>
                    <img
                        src={lamaG}
                        alt="No furulo we"
                        className="relative w-3/4 sm:w-full max-w-sm z-10 scale-x-[-1]"
                    />
                </div>
            </div>

            {/* Mensaje flotante */}
            <div className="flex justify-center items-center w-full max-w-screen-lg h-12 bg-[#FDD46B] text-center text-xl font-semibold my-8">
                Organizar nunca fue tan fácil
            </div>

            {/* Sección inferior */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-24 max-w-screen-lg my-8">
                {/* Bloque 1 */}
                <div className="flex flex-col items-center sm:flex-row">
                    <img
                        src={lamaBan}
                        alt="No furulo we"
                        className="w-48 sm:w-72 h-auto sm:mr-6"
                    />
                    <div className="bg-[#FB9153] flex flex-col p-6 w-72 h-72 rounded-lg">
                        <p className="font-text text-lg sm:text-xl font-semibold">
                            {parragraphsHome.homeP2}
                        </p>
                        <div className="flex justify-end mt-auto">
                            <button className="w-40 h-10 bg-[#FCD05F] rounded-full font-tittles text-base">
                                Sobre Nosotros
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bloque 2 */}
                <div className="flex flex-col items-center sm:flex-row-reverse">
                    <img
                        src={lamaComp}
                        alt="No furulo we"
                        className="w-48 sm:w-72 h-auto sm:ml-6"
                    />
                    <div className="bg-[#E44352] bg-opacity-80 flex flex-col p-6 w-72 h-72 rounded-lg">
                        <p className="font-text text-lg sm:text-xl font-semibold">
                            {parragraphsHome.homeP3}
                        </p>
                        <div className="flex justify-start mt-auto">
                            <button className="w-40 h-10 bg-[#FCD05F] rounded-full font-tittles text-base">
                                Contactos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
