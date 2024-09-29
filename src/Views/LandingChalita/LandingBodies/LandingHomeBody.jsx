import { parragraphsHome } from './parragraphs'
import lamaG from "../../../assets/img/llama_lentes.png"
import lamaBan from "../../../assets/img/llama_banio.png"
import lamaComp from "../../../assets/img/llama_pep.png"
import '../styles/bodies styles/landingBody.css'

export const LandingHomeBody = () => {
    return (
        <>
            <div className="ldn-hm-cont">
                <h1>ChalitaOE</h1>
                <div className="lm-one">
                    <p>
                        {parragraphsHome.homeP1}
                    </p>
                    <div className="lmG-cont">
                        <div className="lmImg">
                            <img src={lamaG} alt="nofurulowe" />
                        </div>
                        <div className="bg">.</div>
                    </div>
                </div>
                <div className="msg-flot">
                    <span>Organizar nunca fue tan fácil</span>
                </div>
                <div className="msgs-bottom">
                    <div className="msg-bot-one">
                        <img src={lamaBan} alt="nofurulowe" />
                        <div className="bg-bot-one">
                            <p>
                                {parragraphsHome.homeP2}
                            </p>
                            <div className="bg-btn-one">
                                <button>Sobre Nosotros</button>
                            </div>
                        </div>
                    </div>
                    <div className="msg-bot-two">
                        <div className="bg-bot-two">
                            <p>
                                {parragraphsHome.homeP3}
                            </p>
                            <div className="bg-btn-two">
                                <button>Contactos</button>
                            </div>
                        </div>
                        <img src={lamaComp} alt="nofurulowe" />
                    </div>
                </div>

            </div>
        </>
    )
}