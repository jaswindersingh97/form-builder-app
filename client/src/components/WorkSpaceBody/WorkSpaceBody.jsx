import styles from './WorkSpaceBody.module.css';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
import FolderIcon from './../../assets/Workspace/FolderIcon.svg';
import DeleteIcon from './../../assets/Workspace/delete.svg';
import { useFolder } from '../../context/FolderContext';
import { toast } from 'react-toastify';
import Api from '../../Api/Api';
function WorkSpaceBody() {
  const navigate = useNavigate();
  const { FolderId, dashboardId } = useParams();
  const { folders, forms, getFolders, getForms, setFolders, setForms } = useFolder();
  const { openModal, closeModal } = useModal();

  // Fetch folders on initial load
  useEffect(() => {
    getFolders(dashboardId);
  }, [dashboardId]);

  // Handle folder changes and update forms
  useEffect(() => {
      getForms(FolderId);
  }, [folders,FolderId]);

  const AddFolder = async (foldername) => {
    const response = await Api({
      endpoint: `/secure/folders/${dashboardId}`,
      method: 'post',
      includeToken: true,
      data: { name: foldername },
    });

    if (response.status === 201) {
      setFolders((prev) => [...prev, response.data.folder]);
      closeModal();
      toast.success('Folder Created successfully');
    }
  };

  const DeleteFolder = async (folderId) => {
    const response = await Api({
      endpoint: `/secure/folders/${folderId}`,
      method: 'delete',
      includeToken: true,
    });

    if (response.status === 200) {
      setFolders((prev) => prev.filter((item) => item._id !== folderId));
      closeModal();
      toast.success('Folder Deleted Successfully');
    }
  };

  const DeleteForm = async (formId) => {
    const response = await Api({
      endpoint: `/secure/forms/${formId}`,
      method: 'delete',
      includeToken: true,
    });

    if (response.status === 200) {
      setForms((prev) => prev.filter((item) => item._id !== formId));
      closeModal();
      toast.success('Form Deleted Successfully');
    }
  };

  const createFolder = () => openModal(<CreateNewFolder AddFolder={AddFolder} />);
  const deleteSomething = ({ something, id, onDelete }) =>
    openModal(<Delete name={something} id={id} onDelete={onDelete} />);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={createFolder} className={styles.Folders}>
          <img src={FolderIcon} alt="📁" />
          Create a Folder
        </div>
        {folders.map((folder) => (
          <div
            key={folder._id}
            onClick={() => navigate(`/${dashboardId}/workspace/${folder._id}`)}
            className={`${styles.Folders} ${
              (!FolderId && folder.name === 'Default') || FolderId === folder._id
                ? styles.Active
                : ''
            }`}
          >
            <span>{folder.name}</span>
            {folder.name !== 'Default' && (
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSomething({ something: 'folder', id: folder._id, onDelete: DeleteFolder });
                }}
                src={DeleteIcon}
                alt="🗑️"
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        <div style={{ flexDirection: 'column', background: '#1A5FFF' }} className={styles.Forms}>
          <p style={{ fontSize: '40px' }}>+</p>
          <span>Create a typebot</span>
        </div>
        {forms.map((form) => (
          <div key={form._id} className={styles.Forms}>
            <span>{form.name}</span>
            <img
              onClick={() =>
                deleteSomething({ something: 'form', id: form._id, onDelete: DeleteForm })
              }
              src={DeleteIcon}
              alt="🗑️"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkSpaceBody;
