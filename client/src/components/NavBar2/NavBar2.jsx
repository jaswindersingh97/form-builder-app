import styles from './style.module.css';
import React from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
function NavBar2() {
    const [formName, setFormName] = useState('');
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <input type='text' placeholder='Enter Form Name' value={formName} onChange={(e)=>setFormName(e.target.value)}/>
        </div>
        <div className={styles.middle}>
            <button>Flow</button>
            <button>Response</button>
        </div>
        <div className={styles.right}>
            <ToggleButton/>
            <button>Share</button>
            <button>Save</button>
            <button>X</button>
        </div>
      
    </div>
  )
}

export default NavBar2
