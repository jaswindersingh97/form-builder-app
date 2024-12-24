import styles from './style.module.css';
import React, {useState} from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { useForm } from '../../context/FormContext';
function NavBar2() {
    const onSave = async()=>{
        // Api for the saving the form
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
            <button>Share</button>
            <button onClick={onSave}>Save</button>
            <button>X</button>
        </div>
    </div>
  )
}

export default NavBar2
