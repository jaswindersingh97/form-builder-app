import styles from './WorkSpaceBody.module.css';
import React from 'react'
import {useModal} from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
import FolderIcon from './../../assets/Workspace/FolderIcon.svg'
import DeleteIcon from './../../assets/Workspace/delete.svg'
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
            <img src={FolderIcon} alt="📁"/>
             Create a Folder
        </div>
        {
            Folders.map((folder, index) => {
                return (
                    <div key={index} className={styles.Folders}>
                        <span>{folder}</span>
                        <img onClick={()=>deleteSomething("folder")} src={DeleteIcon} alt="🗑️"/>
                    </div>
                )
            })
        }
      </div>
      <div className={styles.body}>
        <div style={{flexDirection:"column" , background:"#1A5FFF"}} className={styles.Forms}>
            <p style={{fontSize:"40px"}}>+</p>
            <span>Create a typebot</span>
        </div>
        {
            Forms.map((form, index) => {
                return (
                    <div key={index} className={styles.Forms}>
                        <span>{form}</span>
                        <img onClick={()=>deleteSomething("file")} src={DeleteIcon} alt="🗑️"/>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default WorkSpaceBody
