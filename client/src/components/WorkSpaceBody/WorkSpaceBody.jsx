import styles from './WorkSpaceBody.module.css';
import React, { useEffect } from 'react'
import {useModal} from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
import FolderIcon from './../../assets/Workspace/FolderIcon.svg';
import DeleteIcon from './../../assets/Workspace/delete.svg';
import Api from '../../Api/Api';
import { useFolder } from '../../context/FolderContext';
import { toast } from 'react-toastify';

function WorkSpaceBody() {
    useEffect(()=>{
        getFolders();
    },[])
    const {folders,getFolders, setFolders} = useFolder();  
    const {openModal,closeModal} = useModal();

    const AddFolder = async(foldername) =>{
      const response = await Api({
        endpoint: "/secure/folders",
        method: "post",
        includeToken:true,
        data: { name: foldername },
      });
      if(response.status == 201){
          setFolders((prevState) =>([...prevState,response.data.folder]));  
          closeModal();
        toast.success("Folder Created successfully");
      }
    }

    const createFolder = () => {
        openModal(<CreateNewFolder AddFolder={AddFolder}/>);
    }

    const deleteSomething = (something) => {
        alert(`Delete ${something}`);
        openModal(<Delete name={something} />);
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
