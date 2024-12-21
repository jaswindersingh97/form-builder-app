import NavBar1 from '../../components/NavBar1/NavBar1';
import style from './style.module.css';
import React from 'react'
import withTheme from '../../components/ThemeComponent/ThemeComponent';
function WorkSpace() {
  return (
    <div className={style.container}>
      <NavBar1/>
    </div>
  )
}

export default withTheme(WorkSpace);
