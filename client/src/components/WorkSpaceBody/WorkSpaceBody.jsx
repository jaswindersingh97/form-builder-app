import styles from './WorkSpaceBody.module.css';
import React from 'react'
import {useModal} from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
function WorkSpaceBody() {
    const {openModal} = useModal();
    const createFolder = () => {
        openModal(<CreateNewFolder />);
    }
    const deleteSomething = (something) => {
        alert(`Delete ${something}`)
        openModal(<Delete/>)
    }
    const Folders = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
    const Forms = ["First", "Second", "Third", "Fourth", "Fifth",]; 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={createFolder} className={styles.Folders}>
            📁 Create a Folder
        </div>
        {
            Folders.map((folder, index) => {
                return (
                    <div key={index} className={styles.Folders}>
                        <span>{folder}</span>
                        <span onClick={()=>deleteSomething("folder")}>trash</span>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                )
            })
        }
      </div>
      <div className={styles.body}>
        <div className={styles.Forms}>
            <p>+</p>
            <p>Create a typebot</p>
        </div>
        {
            Forms.map((form, index) => {
                return (
                    <div key={index} className={styles.Forms}>
                        <span>{form}</span>
                        <span onClick={()=>deleteSomething("file")}>trash</span>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default WorkSpaceBody
