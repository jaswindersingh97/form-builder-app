import React,{useState} from 'react'
import styles from './CreateNewFolder.module.css';
function CreateNewFolder() {
    const [folder,setFolder] = useState("");
  return (
    <div className={styles.container}>
      <h1>Create New Folder</h1>
      <input type="text" placeholder="Enter folder Name" value={folder} onChange={(e)=>setFolder(e.target.value)} />
      <div className={styles.buttonContainer}>
        <button className={styles.createButton}>Done</button>
        <hr />
        <button className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  )
}

export default CreateNewFolder
