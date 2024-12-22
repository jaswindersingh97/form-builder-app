import React from 'react'
import styles from './style.module.css';
import flag from './../../assets/FormPage/Flag.svg'
import {buttons,Date,Email,Gif,Image,Number,Phone,Rating,TextBubble,Textinput,Video} from './../../assets/FormPage';
import deleteicon from './../../assets/Workspace/delete.svg';
function WorkFlow() {
    const Bubbles = [
      {
        name:"Text",
        icon:TextBubble,
        placeholder:"Click here to edit"
      },
      {
        name:"Image",
        icon:Image,
        placeholder:"Click to add the link"
      },
      {
        name:"Video",
        icon:Video,
        placeholder:"Click to add the link"
      },
      {
        name:"Gif",
        icon:Gif,
        placeholder:"Click to add the link"
      }
    ];
    const inputs = [
      {
        name:"Text",
        icon:Textinput,
        placeholder:"Hint : User will input a text on his form"
      },
      {
        name:"Number",
        icon:Number,
        placeholder:"Hint : User will input a number on his form"
      },
      {
        name:"Email",
        icon:Email,
        placeholder:"Hint : User will input a email on his form"
      },
      {
        name:"Phone",
        icon:Phone,
        placeholder:"Hint : User will input a phone on his form"
      },
      {
        name:"Date",
        icon:Date,
        placeholder:"Hint : User will select a date"
      },
      {
        name:"Rating",
        icon:Rating,
        placeholder:"Hint : User will tap to rate out of 5"

      },
      {
        name:"Button",
        icon:buttons,
      },
    ];
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={flag} alt='flag'/>
        <span>Start</span>
      </div>

      

    </div>
  )
}

export default WorkFlow
