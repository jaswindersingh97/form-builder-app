// pages/SignUp.js
import React,{useState} from "react";
import Form from "./../../components/Form/Form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import buttonIcon from './../../assets/AuthPage/Google Icon.svg'
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif'
import Api from "../../Api/Api";
const SignUp = () => {
    const[loading,setLoading] = useState(false);
  
  const formFields = [
    {
        name: "name",
        label: "Username",
        type: "text",
        required: true,
        validate: (value) =>value.length >= 3,
        errorMessage: "Username should be at least 3 characters",
    },
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      validate: (value, formValues) => value === formValues.password,
      errorMessage: "Passwords do not match",
    },
  ];

  const handleSubmit = async(data) => {
    setLoading(true);
    const {confirmPassword,...finalData}=data; 
    const response =await Api({
      endpoint: "/register",
      method: "POST",
      data:finalData,
    });
    if(response.status === 201){
      toast.success("Account created successfully");}
      setLoading(false);
      
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Sign Up"}/>
      <p>or</p>
      <button onClick={()=>toast.error("This functionality is not yet available")} className="AuthButton">
        <img src={buttonIcon} alt="Google Icon" />
        Sign In with Google
       </button>
       <p>Already have an accout <mark><Link to={"/Signin"}>Login</Link></mark></p>
       {loading?<div style={{alignSelf:'center'}}> <img src={Loading} className='loading' alt="loading"/></div> : null}
          
    </>
  );
};

const RegisterPage = () => (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
  
  
  export default withTheme(RegisterPage); 
