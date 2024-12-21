import { useModal } from '../../context/ModalContext';
import ToggleButton from '../ToggleButton/ToggleButton';
import UserMenu from '../UserMenu/UserMenu';
import styles from './index.module.css';
import React from 'react'
import EmailInvites from './../WorkSpaceModals/EmailInvites/EmailInvites';
function NavBar1() {
  const {openModal} = useModal();
  const ShareClk = () =>{
    openModal(EmailInvites);
  }
  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <UserMenu/>
      </div>
      <div className={styles.right}>
        <ToggleButton/>
        <button onClick={ShareClk}>Share</button>
      </div>
    </div>
  )
}

export default NavBar1
