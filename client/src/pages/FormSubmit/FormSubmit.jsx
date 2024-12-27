import React, { useEffect, useState } from 'react'
import Styles from './FormSubmit.module.css';
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';

function FormSubmit() {
    const {FormId} = useParams();
    const [form,setForm] = useState({});
    const fetchForm = async() =>{
        const response = await Api({
            endpoint:`/public/forms/${FormId}`,
            method:'get',
        })
        setForm(response.data.form);
    }
    useEffect(()=>{
        fetchForm();
        console.log(form);
    },[]);
  return (
    <div className={Styles.container}>
      hii
    </div>
  )
}

export default FormSubmit
