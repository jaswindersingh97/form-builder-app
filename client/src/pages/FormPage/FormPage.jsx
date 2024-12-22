import NavBar2 from '../../components/NavBar2/NavBar2';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import WorkFlow from '../../components/WorkFlow/WorkFlow';
import styles from './style.module.css';
import {buttons,Date,Email,Gif,Image,Number,Phone,Rating,TextBubble,Textinput,Video} from './../../assets/FormPage';
import React from 'react'

function FormPage({mode}) {
  const Bubbles = [
    {
      name:"Text",
      icon:TextBubble
    },
    {
      name:"Image",
      icon:Image
    },
    {
      name:"Video",
      icon:Video
    },
    {
      name:"Gif",
      icon:Gif
    }
  ];
  const inputs = [
    {
      name:"Text",
      icon:Textinput
    },
    {
      name:"Number",
      icon:Number
    },
    {
      name:"Email",
      icon:Email
    },
    {
      name:"Phone",
      icon:Phone
    },
    {
      name:"Date",
      icon:Date
    },
    {
      name:"Rating",
      icon:Rating
    },
    {
      name:"Button",
      icon:buttons
    },
  ]
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
                  <img src={Bubble.icon} alt={Bubble.name}/>
                  <span>{Bubble.name}</span>
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
                <img src={Bubble.icon} alt={Bubble.name}/>
                  <span>{Bubble.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.right}>
            <WorkFlow/>
          </div>
        </div>
      </div>  
  )
}

export default withTheme(FormPage);
