import ToggleButton from '../ToggleButton/ToggleButton';
import UserMenu from '../UserMenu/UserMenu';
import styles from './index.module.css';
import React from 'react'

function NavBar1() {
  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <UserMenu/>
      </div>
      <div className={styles.right}>
        <ToggleButton/>
        <button>Share</button>
      </div>
    </div>
  )
}

export default NavBar1
