import React, { createContext, useContext ,useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [form,setForm] = useState({
    name:"",
    folder:"",
    elements:[],

  });

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
