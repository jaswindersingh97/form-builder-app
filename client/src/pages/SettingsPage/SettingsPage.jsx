import React from 'react';
import Form from '../../components/Form/Form';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
function SettingsPage() {
    const formFields = [
        {
          name: "username",
          type: "text",
          required: false,
          validate: (value) => value.length >= 3 || value === "", 
          errorMessage: "Username should be at least 3 characters",
        },
        {
          name: "email",
          type: "email",
          required: false, 
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "",
          errorMessage: "Please enter a valid email address",
        },
        {
          name: "Oldpassword",
          type: "password",
          required: false, 
          validate: (value) => value.length >= 6 || value === "", 
          errorMessage: "Password must be at least 6 characters long",
        },
        {
          name: "newPassword",
          type: "password",
          required: false, 
          validate: (value, formFields) => {
            const oldPasswordField = formFields.find(field => field.name === "Oldpassword");
            if (value && !oldPasswordField.value) {
              return false;
            }
            return value.length >= 6 || value === ""; 
          },
          errorMessage: "New password must be at least 6 characters long and Old password cannot be empty if New password is filled",
        },
      ];
      const handleSubmit = (data) => {
        console.log("Form Submitted:", data);
      };

    return (
        <div>
            <div>
                <h1>Settings</h1>
            </div>        
            <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Update"}/>
            <div>
                <button>Log out</button>
            </div>
        </div>
    );
}

export default withTheme(SettingsPage);
