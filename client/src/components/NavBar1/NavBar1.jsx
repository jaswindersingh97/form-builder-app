import { useModal } from '../../context/ModalContext';
import ToggleButton from '../ToggleButton/ToggleButton';
import UserMenu from '../UserMenu/UserMenu';
import styles from './index.module.css';
import React from 'react'
import EmailInvites from './../WorkSpaceModals/EmailInvites/EmailInvites';
import Dropdown from '../Dropdown/Dropdown';
import {Link, useNavigate} from 'react-router-dom'
function NavBar1() {
  const {openModal,closeModal} = useModal();
  const navigate = useNavigate()
  const ShareClk = () =>{
    openModal(<EmailInvites/>);
  }
  const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <Dropdown>
        <Link to={'/settings'}><div className={styles.menuItem}>Settings</div></Link>
            <div onClick={Logout} className={styles.menuItem}>Logout</div>
            <hr/>
            <div className={styles.menuItem}>edit Rights</div>
            <hr/>
            <div className={styles.menuItem}>view Rights</div>
        </Dropdown>
      </div>
      <div className={styles.right}>
        <ToggleButton/>
        <button onClick={ShareClk}>Share</button>
      </div>
    </div>
  )
}

export default NavBar1
