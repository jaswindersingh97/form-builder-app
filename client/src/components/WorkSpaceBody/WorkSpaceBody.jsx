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
    const {folders,getFolders, setFolders,forms,setForms} = useFolder();  
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

    const DeleteFolder = async(folderId) =>{
      const response = await Api({
        endpoint: `/secure/folders/${folderId}`,
        method: "delete",
        includeToken:true,
      });
      if(response.status == 200){
        setFolders((prevState) =>(prevState.filter((item,index)=>(item._id != folderId))));  
        closeModal();
      toast.success("Folder Deleted Successfully");
      }
    };

    const DeleteForm =  async(formId) =>{
      const response = await Api({
        endpoint: `/secure/forms/${formId}`,
        method: "delete",
        includeToken:true,
      });
      if(response.status == 200){
        setForms((prevState) =>(prevState.filter((item,index)=>(item._id != formId))));  
        closeModal();
      toast.success("Form Deleted Successfully");
      }
    };

    const createFolder = () => {
        openModal(<CreateNewFolder AddFolder={AddFolder}/>);
    }

    const deleteSomething = ({something,id,onDelete}) => {
        openModal(<Delete name={something} id={id} onDelete={onDelete}/>);
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
        
        {
            folderList.map((folder) => {
                return (
                    <div key={folder._id} className={styles.Folders}>
                        <span>{folder.name}</span> 
                        <img onClick={() => deleteSomething({something:"folder", id:folder._id, onDelete:DeleteFolder})} src={DeleteIcon} alt="🗑️"/>
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
                        <img onClick={() => deleteSomething({something:"form", id:form._id, onDelete:DeleteForm})} src={DeleteIcon} alt="🗑️"/>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default WorkSpaceBody;
