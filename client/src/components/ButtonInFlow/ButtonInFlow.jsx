import React, { useState } from 'react';
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';

function ButtonInFlow({ object }) {
  const [buttons, setButtons] = useState([
    { id: 1, value: '' }, // Initial state with one text field
  ]);

  // Handle input change
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, value } : button
      )
    );
  };

  // Add new text field
  const addTextField = () => {
    const newId = buttons.length + 1;
    setButtons((prevButtons) => [
      ...prevButtons,
      { id: newId, value: '' },
    ]);
  };

  // Remove text field with validation to ensure at least one remains
  const removeTextField = (id) => {
    if (buttons.length > 1) {
      setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id));
    } else {
      alert("At least one field must remain.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.deleteIcon}>
        <img src={deleteIcon} alt='deleteicon' />
      </div>
      <span>{object.name}</span>
      <div className={styles.input}>
        {buttons.map((button) => (
          <div key={button.id} className={styles.inputGroup}>
            <img src={object.icon} alt={object.name} />
            <input
              type='text'
              placeholder={object.placeholder}
              value={button.value}
              onChange={(e) => handleInputChange(e, button.id)}
            />
            <button type="button" onClick={() => removeTextField(button.id)}>
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={addTextField}>
          Add more
        </button>
        <p>{object.placeholder}</p>
      </div>
      <pre>{JSON.stringify(buttons, null, 2)}</pre> {/* Show stored data */}
    </div>
  );
}

export default ButtonInFlow;
