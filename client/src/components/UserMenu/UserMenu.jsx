import { useState } from 'react';
import styles from './index.module.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleMenu} className={styles.userName}>
        Username
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.menuItem}>Settings</button>
          <button className={styles.menuItem}>Logout</button>
          <hr/>
          <button className={styles.menuItem}>Change User</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
