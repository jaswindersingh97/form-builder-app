import React, { createContext, useContext, useEffect, useState } from 'react';
import Api from './../Api/Api';
import { useToken } from './TokenContext';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const { token } = useToken();

  const getFolders = async (userId) => {
      const response = await Api({
        endpoint: `/secure/folders/${userId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if(response.status == 200){
        setFolders(response.data.folders);
      }
  }

  const getForms = (folderId) => {
    let selectedFolder;
    if(!folderId){
     selectedFolder = folders.find((folder) => folder.name === 'Default');
    }
    else{
      selectedFolder = folders.find((folder) => folder._id === folderId);
    }
    setForms(selectedFolder?.forms || []);
  };
    return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        forms,
        setForms,
        getFolders,
        getForms
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => useContext(FolderContext);
