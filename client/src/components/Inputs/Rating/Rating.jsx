import React, { useState } from 'react';

function Rating({ label, onSave ,disabled }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [savedResponse, setSavedResponse] = useState(null); // Store the saved rating

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSave = () => {
    onSave(selectedRating, label); // Save the selected rating
    setSavedResponse(selectedRating); // Display the saved rating
    setSelectedRating(null); // Clear selection after saving
  };

  return (
    <div>
      <h3>{label}</h3>
      {savedResponse ? (
        <div>{savedResponse}</div>  // Display the saved rating
      ) : (
        <div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              disabled={selectedRating ||disabled}
            >
              {rating}
            </button>
          ))}
          {selectedRating && <button onClick={handleSave}>Save</button>} {/* Save button only visible after selection */}
        </div>
      )}
    </div>
  );
}

export default Rating;
