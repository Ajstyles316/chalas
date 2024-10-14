import './App.css'
import { useState, useEffect } from 'react'
import { LandingHome } from './Views/LandingChalita/views/LandingHome'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingAboutUs } from './Views/LandingChalita/views/LandingAboutUs'
import { LandingContact } from './Views/LandingChalita/views/LandingContact'
import { Login } from './Views/Users Module/view/Login'
import { RegisterClient } from './Views/Users Module/view/RegisterClient'
import { RegisterProvider } from './Views/Users Module/view/RegisterProvider'
import { HomePage } from './Views/HomePage/views/HomePage'
import { Admin } from './Views/Users Module/view/Admin'

// !Imports for firebase modules
import appFirebase from './Firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Provider } from './Views/Users Module/view/Provider'
function App() {
  const auth = getAuth(appFirebase);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
      } else {
        setUser(null);
      }
    });
    
    return () => unsubscribe();
  }, [auth]);  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingHome/>} />
        <Route path='/aboutus' element={<LandingAboutUs />} />
        <Route path='/contact' element={<LandingContact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/provider' element={<Provider />} />
        <Route path='/registerclient' element={<RegisterClient />} />
        <Route path='/registerprovider' element={<RegisterProvider />} />
        <Route path='/home' element={ user ? <HomePage/> : <Login/> }/>
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
