import styles from './AuthLayout.module.css';
import React from 'react';
import {Link} from 'react-router-dom';
import Triangles from './../../assets/AuthPage/Triangles.svg';
import EclipseRight from './../../assets/AuthPage/Ellipseright.svg';
import EclipseBottom from './../../assets/AuthPage/Ellipsebottom.svg';

function AuthLayout( {children}) {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={"/"}>←</Link>
      </div>
      <div className={styles.body}>
        <img className={styles.static1} src={Triangles} alt='dummyImage'/>
        {children}
        <img className={styles.static2} src={EclipseRight} alt='dummyImage'/>
        <img className={styles.static3} src={EclipseBottom} alt='dummyImage'/>
                
      </div>
    </div>
  );
}

export default AuthLayout;
