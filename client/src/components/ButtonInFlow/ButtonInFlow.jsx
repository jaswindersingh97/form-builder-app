import React, { useState } from 'react';
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
import { buttons as buttonIcon } from './../../assets/FormPage';

function ButtonInFlow({ type,label, state,setState}) {
  const object = {
    name: "Button",
    icon: buttonIcon,
    placeholder:
      "Hint: User will select one of many buttons and select what response it wants to give. Add the choices below.",
  };

  const [buttonFields, setButtonFields] = useState([{ id: 1, value: '' }]);

  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setButtonFields((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, value } : button
      )
    );
  };

  const addTextField = () => {
    const newId = buttonFields.length + 1;
    setButtonFields((prevButtons) => [...prevButtons, { id: newId, value: '' }]);
  };

  const removeTextField = (id) => {
    if (buttonFields.length > 1) {
      setButtonFields((prevButtons) =>
        prevButtons.filter((button) => button.id !== id)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.deleteIcon}>
        <img src={deleteIcon} alt="deleteicon" />
      </div>
      <span>{label}</span>
      <div className={styles.input}>
        {buttonFields.map((button) => (
          <div key={button.id} className={styles.inputGroup}>
            <img src={object.icon} alt={object.name} />
            <input
              type="text"
              placeholder={object.placeholder}
              aria-label={`Button field ${button.id}`}
              value={button.value}
              onChange={(e) => handleInputChange(e, button.id)}
            />
            <button
              type="button"
              onClick={() => removeTextField(button.id)}
              disabled={buttonFields.length === 1}
            >
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={addTextField}>
          Add more
        </button>
        <p>{object.placeholder}</p>
      </div>
      <pre>{JSON.stringify(buttonFields, null, 2)}</pre>
    </div>
  );
}

export default ButtonInFlow;
