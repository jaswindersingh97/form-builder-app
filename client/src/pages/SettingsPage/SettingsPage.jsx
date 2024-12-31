import React from 'react';
import Form from './Form';
import styles from './Settings.module.css';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import Api from './../../Api/Api'
import {name,email,password,hidePassword,unhidePassword} from './../../assets/FormComponents/index';
import LogOut from './../../assets/Settings/Logout.svg'
import {useNavigate} from 'react-router-dom'
import { useToken } from '../../context/TokenContext';
import {toast} from 'react-toastify'
function SettingsPage() {
  const {token} = useToken();
    const formFields = [
        {
          name: "name",
          type: "text",
          required: false,
          validate: (value) => value.length >= 3 || value === "", 
          errorMessage: "Username should be at least 3 characters",
          icon:name
        },
        {
          name: "email",
          type: "email",
          required: false, 
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "",
          errorMessage: "Please enter a valid email address",
          icon:email
        },
        {
          name: "oldPassword",
          type: "password",
          required: false, 
          validate: (value) => value.length >= 6 || value === "", 
          errorMessage: "Password must be at least 6 characters long",
          icon:password,
          hidePassword:hidePassword,
          unhidePassword:unhidePassword,
        },
        {
          name: "newPassword",
          type: "password",
          required: false, 
          validate: (value, formValues) => {
            const oldPasswordField = formValues.oldPassword; // Assuming 'oldPassword' is the correct field name.
            if (value) {
              return oldPasswordField && value.length >= 6;
            }
            return true; // If newPassword is not filled, it's valid.
          },
          errorMessage: "New password must be at least 6 characters long and Old password cannot be empty if New password is filled.",
          icon:password,
          hidePassword:hidePassword,
          unhidePassword:unhidePassword,
        }        
      ];
      const handleSubmit = async(data) => {
        const response = await Api({
          endpoint:"/secure/settings",
          method:"post",
          data,
          headers:{
            Authorization:  `Bearer ${token}`
          }
          });

          if(response.status === 200){
            toast.success(response.data.message);
            window.location.href = from;
          }  
      };
      const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
            </div>
            <div className={styles.body}>
              <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Update"}/>
            </div>        
            <div className={styles.footer}>
              <button onClick={()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                navigate('/signIn')

              }}><img src={LogOut} alt='logOut'/> Log out</button>
            </div>
        </div>
    );
}

export default withTheme(SettingsPage);
