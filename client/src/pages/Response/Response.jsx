import React, { useEffect } from 'react'
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';

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
    <div class>

    </div>
  )
}

export default withTheme(Response);
