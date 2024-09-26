import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { LandingHome } from './Views/LandingChalita/views/LandingHome'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { LandingAboutUs } from './Views/LandingChalita/views/LandingAboutUs'
import { LandingContact } from './Views/LandingChalita/views/LandingContact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path = '/' element={<LandingHome />}/>
          <Route path = '/aboutus' element={<LandingAboutUs/>}/>
          <Route path = 'contact' element={<LandingContact/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
