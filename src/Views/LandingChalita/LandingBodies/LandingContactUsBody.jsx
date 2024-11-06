import { Contact } from "../components/Contact"
import lamaMoto from "../../../assets/img/llama_moto.png"
import lamaSad from "../../../assets/img/llama_pep.png"
export const LandingContactUsBody = () => {

    return (
        <>
            <div className="flex items-center justify-center gap-6">
                <div className="">
                    <span className="font-bold text-2xl text-[#975F7C]">Lo sentimos!</span>
                    <p className="text-2xl">
                        ¿Algo salió mal? No te preocupes,<br /> dinos qué pasó y nos pondremos manos a la obra para resolverlo.
                    </p>
                </div>
                <div className="relative w-full max-w-md p-8">
                    <div className="absolute right-0 top-0 w-3/4 h-full bg-[#FF9F87] rounded-lg" />
                    <div className="relative z-10 flex justify-center">
                        <img
                            src={lamaSad}
                            alt="No furulo we"
                            className="w-full h-auto max-w-sm"
                        />
                    </div>
                </div>
            </div>

            <Contact />
            <p className="flex items-center justify-center text-lg text-[#975F7C] font-bold">¿Tu queja es importante? ¡Visítanos en nuestras oficinas <br /> de atención al cliente y te ayudaremos personalmente!</p>
            <div className="flex items-center justify-center ">
                <img src={lamaMoto} alt="No furulo we" className="w-[400px] h-[400px]" />
                <p>Edificio Guadalquivir, ubicado en la Av. 20 de Octubre esquina Rosendo Gutiérrez en Sopocachi <br />
                    La Paz, Bolivia<br />
                    Teléfonos:<br />
                    + 591 701-02184<br />
                    + 591 601-48447<br />
                    E.com.bo<br />
                    Web:www.ChalitaOE.com.bo<br/>
                 Horarios:Lunes - Viernes: 9:30am a 19:00pm<br/>
                    ado: 10:00am a 13:00pm<br/>
                  </p>
        </div>
                    </>
    )
}