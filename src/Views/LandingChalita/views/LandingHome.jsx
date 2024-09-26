import { LandingHomeBody } from "../LandingBodies/LandingHomeBody"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"

export const LandingHome = () => {
    return (
        <div className="ldn-container">
            <NavBar />
            <LandingHomeBody />
            <Footer />
        </div>
    )
}