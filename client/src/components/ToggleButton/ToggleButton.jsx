import { useState } from 'react';
import styles from './ToggleButton.module.css';
import { useTheme } from '../../context/ThemeContext';

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(!theme);
  };

  return (
    <button
      className={`${styles.toggleButton} ${theme ? styles.active : ''}`}
      onClick={handleToggle}
    >
      <span className={styles.slider}></span>
    </button>
  );
};

export default ToggleButton;
