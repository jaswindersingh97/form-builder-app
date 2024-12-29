import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../Api/Api'
function SharedPage() {
    const {data} = useParams()
    const getRights = async() =>{
        const response = await Api({
            endpoint:`/secure/dashboard/verifyLink/${data}`,
            includeToken:true,
            method:'get'
        });
        console.log(response.data,"hii");
    }
    useEffect(()=>{
        getRights()
    },[])
  return (
    <div>
      hi
    </div>
  )
}

export default SharedPage
