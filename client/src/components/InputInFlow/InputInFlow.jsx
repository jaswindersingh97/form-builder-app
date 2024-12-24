import React from 'react'
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
function InputInFlow({object}) {
  return (
    <div className={styles.container}>
        <div className={styles.deleteIcon}>
      <img src={deleteIcon} alt='deleteicon'/>
        </div>
      <span>
        {object.name}
      </span>
      <div className={styles.input}>
        <img src={object.icon} alt={object.name}/>
        {/* <input type='text' placeholder={object.placeholder}/> */}
        <p>{object.placeholder}</p>
      </div>
    </div>
  )
}

export default InputInFlow
