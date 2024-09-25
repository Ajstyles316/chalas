import { LandingBody } from "./components/LandingBody"
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"

export const LandingPage = () =>{
    return(
        <div className="landing-container">
            <NavBar />
            <LandingBody />
            <Footer />  
        </div>
    )
}