import React from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { ThemedLandingPage } from './pages/LandingPage/LandingPage'
import SignInPage from './pages/SignIn/SignIn'
import RegisterPage from './pages/Register/Register'
import SettingsPage from './pages/SettingsPage/SettingsPage';
function App() {
  const theme = "dark";
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemedLandingPage  />} />
          <Route path='/SignIn' element={<SignInPage/>}/>
          <Route path='/Register' element={<RegisterPage theme={theme}/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
