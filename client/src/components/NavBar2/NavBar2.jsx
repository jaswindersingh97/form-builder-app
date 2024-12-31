import styles from './style.module.css';
import React, {useEffect, useState} from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { useForm } from '../../context/FormContext';
import Api from '../../Api/Api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif'

function NavBar2({loading}) {
    const {dashboardId,FolderId,FormId} = useParams();
    const [formId,setFormId] = useState(FormId || '');
    const {form,setForm,formErrors, setFormErrors} = useForm();

    const location = useLocation();

    const handleGoBack = () => {
      const basePath = location.pathname.split('/editForm')[0];
      navigate(basePath);
    };
    const navigate = useNavigate();
    useEffect(()=>{
      setForm(() =>(
          {folder:FolderId}
      ))
    },[])

    const isFormValid = () => {
      let errors = {}; // This will store error messages
      let isValid = true;
    
      form.elements.forEach((element) => {
        // Check for Bubbles
        if (element.superType === 'Bubbles') {
          if (element.value.trim().length < 1) {
            // console.log("failed")
            errors[element.label] = 'This field cannot be empty.';
            isValid = false;
          }
        }
        // Check for Buttons
        else if (element.superType === 'Inputs' && element.type === 'Buttons') {
          if (element.buttonValues.length === 0) {
            errors[element.label] = 'Please add at least one button.';
            isValid = false;
          } else {
            element.buttonValues.forEach((button, index) => {
              if (button.value.trim().length < 1) {
                errors[element.label] = 'Button value cannot be empty.';
                isValid = false;
              }
            });
          }
        }
        // Add additional validation for other field types here
      });
      setFormErrors(errors); // Update the error state
      return isValid; // Return whether the form is valid
    };
        

    const onSave = async()=>{
      if(!isFormValid()){
        toast.error("fill complete Data")
      }
      else{
        let config = {
            endpoint:"/secure/forms",
            includeToken:true,
            method:"post",
            data:form
        }
        if(formId){
            config={
                endpoint:`/secure/forms/${formId}`,
                method:"patch",
                includeToken:true,
                data:form
            }
        }
        const Response = await Api(config);
        if(Response.status == 201){
            toast.success("The form is created successfully");
            setFormId(Response.data.form._id);
        }
        if(Response.status == 200){
            toast.success("The form is Updated successfully");
            setFormId(Response.data.form._id);
        }   
      }
    
      }
    const shareForm = () => {
        const fullDomain = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
        const link = `${fullDomain}/FormSubmit/${formId}`;
        navigator.clipboard.writeText(link)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch(err => {
            toast.error("Failed to copy the link.");
          });
      };
    
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            {
                !loading?
                <input type='text' placeholder='Enter Form Name' value={form.name} onChange={(e)=>setForm((prevData)=>({...prevData, name:e.target.value}))}/> 
                :<img src={Loading} className='loading' alt='loading'/>
            }
        </div>
        <div className={styles.middle}>
        <button
        onClick={() => navigate(`/${dashboardId}/workspace/${FolderId}/editForm/${FormId}`)}
        className={ styles.activeButton}
      >
        Flow
      </button>
      <button
        onClick={() =>{
          if(!formId){
            toast.error("please save the Form first")
            console.log(FormId)
          }
          else{
          navigate(`/${dashboardId}/workspace/${FolderId}/responses/${formId}`)}}
          } 
        className={styles.notselected}
      >
        Response
      </button>
        </div>
        <div className={styles.right}>
            <ToggleButton/>
            <button className={`${styles.rightButtons} ${formId ? styles.Active : ''}`} disabled={!formId} onClick={shareForm}>Share</button>
            <button className={styles.save} onClick={onSave}>Save</button>
            <button onClick={handleGoBack} className={styles.x}>X</button>
        </div>
    </div>
  )
}

export default NavBar2
