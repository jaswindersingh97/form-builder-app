import { useModal } from '../../context/ModalContext';
import ToggleButton from '../ToggleButton/ToggleButton';
import styles from './index.module.css';
import React, { useEffect, useState } from 'react'
import EmailInvites from './../WorkSpaceModals/EmailInvites/EmailInvites';
import Dropdown from '../Dropdown/Dropdown';
import {Link, useNavigate, useParams} from 'react-router-dom'
import Loading from './../../assets/Loading/loading.gif' 
import Api from '../../Api/Api';
function NavBar1() {
  const {dashboardId} = useParams();
  const {openModal,closeModal} = useModal();
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const ShareClk = () =>{
    openModal(<EmailInvites/>);
  }
  const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  }
  const [user,setUser] = useState({});
  const getUser = async()=>{
    const response =await Api({
      endpoint:"/secure/users",
      method:"get",
      includeToken:true,
    })
    setUser(response.data);
    setLoading(false)
  }
  useEffect(()=>{
  getUser();
  },[])
  const ActiveUser = () => {
    let activeUserName = '';
  
    if (!dashboardId || dashboardId === user._id) {
      activeUserName = user.name;
    }  
    else{
    const dashboard = user?.sharedDashboards?.find(dashboard => {
      return String(dashboard.userId._id) === dashboardId; 
    });
    if (dashboard) {
      activeUserName = dashboard.userId.name;
    }

    }
    return activeUserName && `${activeUserName}`;
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.middle}>
      {loading ? <img src={Loading} className='loading' alt='loading'/>:      
        <Dropdown active={ActiveUser() }>
        <Link to={'/settings'}><div className={styles.menuItem}>Settings</div></Link>
            <div onClick={Logout} style={{color:'#FFA54C'}} className={styles.menuItem}>Logout</div>
            <hr/>
            <div>edit Rights</div>
            {
              user?.sharedDashboards?.map((item,index) =>(
                item.permission == 'edit' &&
                <div key={item.userId._id} onClick={()=>navigate(`/${item.userId._id}/workspace`)} className={styles.menuItem}>{item.userId.name}'s dashboard</div>
              ))
            }
            <hr/>
            <div>view Rights</div>
            {
              user?.sharedDashboards?.map((item,index) =>(
                item.permission == 'view' &&
                <div key={item.userId._id} onClick={()=>navigate(`/${item.userId._id}/workspace`)} className={styles.menuItem}>{item.userId.name}</div>
              ))
            }
            <hr/>
            <div style={{color:'#1A5FFF'}} onClick={()=>navigate('/Workspace')} className={styles.menuItem}>{user.name}</div>
        </Dropdown>}
      </div>
      <div className={styles.right}>
        <ToggleButton/>
        <button className={styles.sharebutton} onClick={!loading ? ShareClk: null}>Share</button>
      </div>
    </div>
  )
}

export default NavBar1
