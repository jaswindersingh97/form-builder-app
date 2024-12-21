import React from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { ThemedLandingPage } from './pages/LandingPage/LandingPage'
import SignInPage from './pages/SignIn/SignIn'
import RegisterPage from './pages/Register/Register'
import SettingsPage from './pages/SettingsPage/SettingsPage';
import WorkSpace from './pages/WorkSpace/WorkSpace';
function App() {
  const theme = "dark";
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemedLandingPage theme={theme} />} />
          <Route path='/SignIn' element={<SignInPage theme={theme}/>}/>
          <Route path='/Register' element={<RegisterPage theme={theme}/>}/>
          <Route path='/settings' element={<SettingsPage theme={theme}/>}/>
          <Route path='/WorkSpace' element={<WorkSpace theme={theme}/>} />
          <Route path='/WorkSpace/create' element={<FormPage mode={"create"} theme={theme}/>} />
          <Route path='/WorkSpace/edit/:id' element={<FormPage mode={"edit"} theme={theme}/>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
