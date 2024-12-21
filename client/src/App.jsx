import React from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { ThemedLandingPage } from './pages/LandingPage/LandingPage'
import AuthLayout from './components/AuthLayout/AuthLayout'
function App() {
  const theme = "dark";
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemedLandingPage  />} />
          <Route path='/test' element={<AuthLayout/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
