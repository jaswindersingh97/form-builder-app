import styles from './AuthLayout.module.css';
import React from 'react'

function AuthLayout({children}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button>←</button>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
