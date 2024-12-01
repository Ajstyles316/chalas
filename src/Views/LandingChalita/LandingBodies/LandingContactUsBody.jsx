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
            <span className="flex items-center justify-center text-3xl p-6 text-[#975F7C] font-bold">Brindanos información sobre el problema</span>
            <Contact />
            <p className="flex items-center justify-center text-lg text-[#975F7C] font-bold">¿Tu queja es importante? ¡Visítanos en nuestras oficinas <br /> de atención al cliente y te ayudaremos personalmente!</p>
            <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg p-6 md:p-12 space-y-6 md:space-y-0 md:space-x-8">
                <img
                    src={lamaMoto}
                    alt="No furulo we"
                    className="w-60 h-60 md:w-[400px] md:h-[400px] rounded-lg object-cover shadow-md"
                />
                <div className="text-gray-700 text-center md:text-left">
                    <p className="mb-4">
                        <strong>Edificio Guadalquivir</strong>, ubicado en la Av. 20 de Octubre esquina Rosendo Gutiérrez en Sopocachi,
                        <strong> La Paz, Bolivia</strong>
                    </p>
                    <p className="mb-4">
                        <strong>Teléfonos:</strong><br />
                        +591 701-02184<br />
                        +591 601-48447
                    </p>
                    <p className="mb-4">
                        <strong>Email:</strong> E.com.bo<br />
                        <strong>Web:</strong> <a href="http://www.ChalitaOE.com.bo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            www.ChalitaOE.com.bo
                        </a>
                    </p>
                    <p>
                        <strong>Horarios:</strong><br />
                        Lunes - Viernes: 9:30am a 7:00pm<br />
                        Sábado: 10:00am a 1:00pm
                    </p>
                </div>
            </div>
            <span className="flex items-center justify-center text-3xl p-8 text-[#975F7C] font-bold">Nuestra ubicación</span>
            <div className="flex items-center justify-center text-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d337.3872885344611!2d-68.12753677832839!3d-16.509074389956886!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20623e358e65%3A0x42157ac0bd97364f!2sEDIFICIO%20GUADALQUIVIR%20%232332%20MEZANINE%20OFICINA%20104!5e0!3m2!1ses-419!2sbo!4v1731338578792!5m2!1ses-419!2sbo" width="800" height="450" loading="lazy" className="p-2">
                </iframe>
            </div>

        </>
    )
}