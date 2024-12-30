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
    const location = useLocation();
    const navigate = useNavigate();
    const isFlowActive = location.pathname === `/${dashboardId}/workspace/${FolderId}/editForm/${FormId}`;
    const isResponseActive = location.pathname === `/${dashboardId}/workspace/${FolderId}/responses/${FormId}`;
    useEffect(()=>{
      setForm(() =>(
          {folder:FolderId}
      ))
    },[])
    const onSave = async()=>{
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
    const {form,setForm} = useForm();
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
        onClick={() => navigate(`/${dashboardId}/workspace/${FolderId}/responses/${FormId}`)}
        className={styles.notselected}
      >
        Response
      </button>
        </div>
        <div className={styles.right}>
            <ToggleButton/>
            <button className={`${styles.rightButtons} ${formId ? styles.Active : ''}`} disabled={!formId} onClick={shareForm}>Share</button>
            <button className={styles.save} onClick={onSave}>Save</button>
            <button className={styles.x}>X</button>
        </div>
    </div>
  )
}

export default NavBar2
