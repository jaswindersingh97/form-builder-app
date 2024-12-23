import React from 'react'
import styles from './Delete.module.css'
function Delete({name,id,onDelete}) {
  const onSubmit = async(e)=>{
    e.preventDefault();
    await onDelete(id);
  }
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2>Are you sure you want to delete this {name}</h2>
      <div>
        <button type='submit' className={styles.deleteButton}>Delete</button>
        <hr />
        <button type='reset' className={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  )
}

export default Delete;
