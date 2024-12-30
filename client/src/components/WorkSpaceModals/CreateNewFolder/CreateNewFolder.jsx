import React, { useState } from 'react'
import styles from './CreateNewFolder.module.css';

function CreateNewFolder({ AddFolder }) {
  const [folder, setFolder] = useState("");
  const [error, setError] = useState("");  // To hold the error message

  const FormSubmit = async (e) => {
    e.preventDefault();

    if (!folder.trim()) {
      setError("Folder name is required.");
      return;
    }

    setError("");
    await AddFolder(folder);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={FormSubmit}>
        <h3>Create New Folder</h3>
        <input
          type="text"
          placeholder="Enter folder Name"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>} {/* Display error message if any */}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.createButton}>Done</button>
          <button type="reset" className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNewFolder;
