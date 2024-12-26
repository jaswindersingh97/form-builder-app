import styles from './style.module.css';
import React, {useEffect, useState} from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { useForm } from '../../context/FormContext';
import Api from '../../Api/Api';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
function NavBar2() {
    const {FolderId,FormId} = useParams();
    const [formId,setFormId] = useState(FormId || '');
    useEffect(()=>{
      setForm((prevData) =>(
          {...prevData, folder:FolderId}
      ))
      console.log(FormId);
    },[])
    const onSave = async()=>{
        const Response = await Api({
            endpoint:"/secure/forms",
            includeToken:true,
            method:"post",
            data:form
        });
        if(Response.status == 201){
            toast.success("The form is created successfully");
            setFormId(Response.data.form._id);
        }
        console.log(Response,formId);
    }
    const {form,setForm} = useForm();
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <input type='text' placeholder='Enter Form Name' value={form.name} onChange={(e)=>setForm((prevData)=>({...prevData, name:e.target.value}))}/>
        </div>
        <div className={styles.middle}>
            <button>Flow</button>
            <button>Response</button>
        </div>
        <div className={styles.right}>
            <ToggleButton/>
            <button className={`${formId && styles.Active}`}>Share</button>
            <button onClick={onSave}>Save</button>
            <button>X</button>
        </div>
    </div>
  )
}

export default NavBar2
