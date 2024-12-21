import NavBar2 from '../../components/NavBar2/NavBar2';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import styles from './style.module.css';

import React from 'react'

function FormPage({mode}) {
  const Bubbles = ["Text","Image","Video","GIF"];
  const inputs = ["Text","Number","Email","Phone","Date","Rating","Buttons"]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavBar2/>
        <hr/>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.Title}>
            <h3>Bubbles</h3>
          </div>
          <div className={styles.Fields}>
            {Bubbles.map((Bubble,index)=>{
              return(
                <div key={index} className={styles.Field}>
                  <img alt={Bubble}/>
                  <span>{Bubble}</span>
                </div>
              )
            })}
          </div>
          <div className={styles.Title}>
            <h3>Inputs</h3>
          </div>
          <div className={styles.Fields}>
            {inputs.map((Bubble,index)=>{
              return(
                <div key={index} className={styles.Field}>
                  <img alt={Bubble}/>
                  <span>{Bubble}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.right}>
            
          </div>
        </div>
      </div>  
  )
}

export default withTheme(FormPage);
