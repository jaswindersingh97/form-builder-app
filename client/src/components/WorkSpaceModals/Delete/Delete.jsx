import React from 'react'
import styles from './Delete.module.css'
function Delete() {
  const folder = 'folder'
  return (
    <div className={styles.container}>
      <h2>Are you sure you want to delete this {folder}</h2>
      <div>
        <button type='submit' className={styles.deleteButton}>Delete</button>
        <hr />
        <button type='reset' className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteFolder
