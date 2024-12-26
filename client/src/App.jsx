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
import FormPage from './pages/FormPage/FormPage';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useTheme } from './context/ThemeContext';
function App() {
  const {theme}=useTheme();
  const themeStyle = theme ? "dark" : "light"; 
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemedLandingPage theme={themeStyle} />} />
          <Route path='/SignIn' element={<ProtectedRoutes element={<SignInPage theme={themeStyle}/>} isPublic={true}/>}/>
          <Route path='/Register' element={<ProtectedRoutes element={<RegisterPage theme={themeStyle}/>} isPublic={true}/>}/>
          <Route path='/settings' element={<ProtectedRoutes element={<SettingsPage theme={themeStyle}/>} isPublic={false}/>}/>
          <Route path='/:dashboardId/WorkSpace/' element={<ProtectedRoutes element={<WorkSpace theme={themeStyle}/>} isPublic={false}/>} />
          <Route path='/:dashboardId/Workspace/:FolderId' element={<ProtectedRoutes element={<WorkSpace theme={themeStyle}/>} isPublic={false}/>}/> 
          <Route path='/:dashboardId/Workspace/:FolderId/createForm' element={<ProtectedRoutes element={<FormPage mode={"create"} theme={themeStyle}/>} isPublic={false}/>} />
          <Route path='/:dashboardId/Workspace/:FolderId/editForm/:id' element={<ProtectedRoutes element={<FormPage mode={"edit"} theme={themeStyle}/>} isPublic={false}/>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
