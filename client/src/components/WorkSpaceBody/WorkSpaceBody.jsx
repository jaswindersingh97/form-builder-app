import styles from './WorkSpaceBody.module.css';
import React from 'react'
import {useModal} from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
import FolderIcon from './../../assets/Workspace/FolderIcon.svg';
import DeleteIcon from './../../assets/Workspace/delete.svg';

import { useFolder } from '../../context/FolderContext';

function WorkSpaceBody() {
    const {folders, setFolders} = useFolder();  
    const {openModal} = useModal();

    const createFolder = () => {
        openModal(<CreateNewFolder />);
    }

    const deleteSomething = (something) => {
        alert(`Delete ${something}`);
        openModal(<Delete />);
    }

    // Ensure folders is an array, fallback to an empty array if undefined
    const folderList = folders || [];
    const Forms =[]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={createFolder} className={styles.Folders}>
            <img src={FolderIcon} alt="📁"/>
             Create a Folder
        </div>
        
        {/* Map over folderList (from context) to render folders */}
        {
            folderList.map((folder, index) => {
                return (
                    <div key={index} className={styles.Folders}>
                        <span>{folder.name}</span> {/* Assuming folder has a 'name' property */}
                        <img onClick={() => deleteSomething("folder")} src={DeleteIcon} alt="🗑️"/>
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

        {/* Render forms */}
        {
            Forms.map((form, index) => {
                return (
                    <div key={index} className={styles.Forms}>
                        <span>{form}</span>
                        <img onClick={() => deleteSomething("file")} src={DeleteIcon} alt="🗑️"/>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default WorkSpaceBody;
