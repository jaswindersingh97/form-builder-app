import { useState } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button
      className={`${styles.toggleButton} ${isToggled ? styles.active : ''}`}
      onClick={handleToggle}
    >
      <span className={styles.slider}></span>
    </button>
  );
};

export default ToggleButton;
