import React, { useState } from 'react';

function Text({ label, onSave, type }) {
  const [inputValue, setInputValue] = useState('');
  const [savedResponse, setSavedResponse] = useState(null);  // Store the saved response

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue, label); // Save the input value
    setSavedResponse(inputValue); // Store the response for display
    setInputValue(''); // Clear the input field
  };

  return (
    <div>
      <h3>{label}</h3>
      {savedResponse ? (
        <div>{savedResponse}</div>  // Display the saved response once the field is saved
      ) : (
        <div>
          <input
            type={type}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSave} disabled={!inputValue}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default Text;
