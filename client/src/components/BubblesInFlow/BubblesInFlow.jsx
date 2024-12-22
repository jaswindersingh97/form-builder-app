import React from 'react'
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
function BubblesInFlow({object}) {
    // const object = {
    //     name:"Text",
    //     icon:"/client/src/assets/FormPage/Text.svg",
    //     placeholder:"Click here to edit"
    // }
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
        <input type='text' placeholder={object.placeholder}/>
      </div>
    </div>
  )
}

export default BubblesInFlow
