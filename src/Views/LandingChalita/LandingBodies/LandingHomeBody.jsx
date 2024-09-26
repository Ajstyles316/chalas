import {parragraphsHome} from './parragraphs'
import lamaG from "../../../assets/img/llama_lentes.png"
import lamaBan from "../../../assets/img/llama_banio.png"
import lamaComp from "../../../assets/img/llama_pep.png"

export const LandingHomeBody = () =>{
    return (
        <>
            <div className="ldn-hm-cont">
                <h1>ChalitaOe</h1>
                <div className="msg-first">
                    <p>
                        {parragraphsHome.homeP1}
                    </p>
                    <div className="lmG-cont">
                        <img src={lamaG} alt="nofurulowe" />
                    </div>
                    <div className="msg-flot">
                        <span>Organizar nunca fue tan fácil</span>
                    </div>
                    <div className="msgs-bottom">
                        <div className="msg-bot-one">
                            {parragraphsHome.homeP2}
                            <img src={lamaBan} alt="nofurulowe" />
                        </div>
                        <div className="msg-bot-two">
                            {parragraphsHome.homeP3}
                            <img src={lamaComp} alt="nofurulowe" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}