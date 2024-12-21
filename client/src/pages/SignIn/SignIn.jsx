// pages/SignUp.js
import React from "react";
import Form from "./../../components/Form/Form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import buttonIcon from './../../assets/AuthPage/Google Icon.svg'
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const SignIn = () => {
  const formFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Please enter a valid email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      validate: (value) => value.length >= 6,
      errorMessage: "Password must be at least 6 characters long",
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Log In"}/>
      <p>or</p>
      <button  onClick={()=>toast.error("This functionality is not yet available")} className="AuthButton">
        <img src={buttonIcon} alt="Google Icon" />
        Sign In with Google
       </button >
       <p>Don’t have an account? <mark><Link to={"/register"}>Register now</Link></mark></p>
    </>
    
  );
};


const SignInPage = () => (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
  
  
  export default withTheme(SignInPage); 
