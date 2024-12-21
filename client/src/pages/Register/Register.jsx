// pages/SignUp.js
import React from "react";
import Form from "./../../components/Form/Form";

const SignUp = () => {
  const formFields = [
    {
        name: "username",
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
      validate: (value) => value === formFields[1].value,
      errorMessage: "Passwords do not match",
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <Form fields={formFields} onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUp;
