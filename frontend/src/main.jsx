import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import LandingPage from './pages/LandingPage.jsx'
import Authentication from './pages/Authentication.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import VideoMeet from './pages/VideoMeet.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
     <Routes>

      <Route path='/' element={<LandingPage/>}/>
      <Route path='/auth' element={<Authentication/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/history'element={<History/>}/>
      <Route path='/:url'element={<VideoMeet/>}/>
     </Routes>
     </AuthProvider>
   
   
   </BrowserRouter>
  

  </StrictMode>,
)
