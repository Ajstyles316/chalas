import './App.css'
import { useState } from 'react'
import { LandingHome } from './Views/LandingChalita/views/LandingHome'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
