import React from 'react'
import styles from './style.module.css';
function EmailInvites() {
  return (
    <div className={styles.container}>
        <form>
      <div className={styles.header}>
        <h2>Invite by Email</h2>
        <select>
        <option value={'Edit'}>Edit</option>
        <option value={'View'}>View</option>
        </select>
      </div>
      <div className={styles.body}>
        <input type="email" placeholder="Email id" />
        <button>Send Invite</button>
        <h3>Invite by link</h3>
        <button>Copy link</button>
      </div>
      </form>
    </div>
  )
}

export default EmailInvites
