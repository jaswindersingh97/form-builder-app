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

  const getForms = (folderId) =>{
    if(!folderId){
      setForms(folders.filter((item)=>(
        item.name =='Default'
      )))
    }
    setForms(folders.filter((item)=>(
      item._id == folderId
    )))
    console.log(forms)
  }
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
