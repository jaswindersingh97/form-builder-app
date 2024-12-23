import React, { createContext, useContext, useEffect, useState } from 'react';
import Api from './../Api/Api';
import { useToken } from './TokenContext';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const { token } = useToken();

  const getFolders = async () => {
      const response = await Api({
        endpoint: "/secure/folders",
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
  // useEffect(()=>{
  //   getFolders();
  // },[])

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        forms,
        setForms,
        getFolders
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => useContext(FolderContext);
