import React, { useState } from 'react'
import styles from './CreateNewFolder.module.css';
function CreateNewFolder() {
    const [folder,setFolder] = useState("")
  return (
    <div className={styles.container}>
      <form onSubmit={(e)=>e.preventDefault()}>
      <h1>Create New Folder</h1>
      <input type="text" placeholder="Enter folder Name" value={folder} onChange={(e)=>setFolder(e.target.value)} />
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.createButton}>Done</button>
        <hr />
        <button type='reset' className={styles.cancelButton}>Cancel</button>
      </div>
      </form>
    </div>
  )
}

export default CreateNewFolder
