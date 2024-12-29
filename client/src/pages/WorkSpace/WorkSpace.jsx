import NavBar1 from '../../components/NavBar1/NavBar1';
import style from './style.module.css';
import React from 'react'
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import WorkSpaceBody from '../../components/WorkSpaceBody/WorkSpaceBody';
import Modal from './../../components/Modal/Modal';
function WorkSpace() {
  
  return (
    <div className={style.container}>
      <Modal/>
      <NavBar1/>
      <WorkSpaceBody/>
    </div>
  )
}

export default withTheme(WorkSpace);
