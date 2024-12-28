import React, { useEffect } from 'react'
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import styles from './styles.module.css'
function Response() {
    const {formId} = useParams();
    const fetchData = async() =>{
        const response = await Api({
            endpoint:`/secure/analytics/${formId}`,
            includeToken:true,
            method:'get',
        });
        console.log(response);
    }
    useEffect(() =>{
        fetchData();
    },[])
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.count}><p>Views:</p> {}</div>
            <div className={styles.count}><p>Starts:</p> {}</div>
        </div>
        <div className={styles.body}>
            
        </div>
        <div className={styles.footer}>
            
        </div>
    </div>
  )
}

export default withTheme(Response);
