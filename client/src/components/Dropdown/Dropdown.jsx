import { useState } from 'react';
import styles from './index.module.css';

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleMenu} className={styles.userName}>
        Username
      </button>
      {isOpen && <div className={styles.dropdownMenu}>{children}</div>}
    </div>
  );
};

export default Dropdown;
