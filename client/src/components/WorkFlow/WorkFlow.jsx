import React from 'react'
import styles from './style.module.css';
import flag from './../../assets/FormPage/Flag.svg'
import {buttons,Date,Email,Gif,Image,Number,Phone,Rating,TextBubble,Textinput,Video} from './../../assets/FormPage';
import BubblesInFlow from '../BubblesInFlow/BubblesInFlow';
import InputInFlow from '../InputInFlow/InputInFlow';
import ButtonInFlow from '../ButtonInFlow/ButtonInFlow';
import { useForm } from '../../context/FormContext';
function WorkFlow() {
  const {form,setForm} = useForm();
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
        placeholder:"Hint : User wil select on of many buttons and select what response it wants to give, Add the choices below"
      },
    ];
    const Buttonsone = {
      name:"Button",
      icon:buttons,
      placeholder:"Hint : User wil select on of many buttons and select what response it wants to give, Add the choices below"
    }
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={flag} alt='flag'/>
        <span>Start</span>
      </div>
      {
        form.elements.map((element, index) => {
          if (element.superType === 'Bubbles') {
            return <BubblesInFlow key={index} type={element.type} label={element.label} state={form} setState={setForm} />;
          } 
          else if (element.superType === 'Inputs' && element.type === 'Buttons') {
            return <ButtonInFlow key={index} label={element.label} state={form} setState={setForm}/ >;
          }
          else if( element.superType ==='Inputs'){
            return <InputInFlow key={index} type={element.type} label={element.label}/>
          }
          // Handle unexpected cases gracefully
          return <p key={index}>Unsupported element</p>;
        })
      }

      {/* {
        Bubbles.map((item,index)=>(
          <BubblesInFlow object={item} key={index}/>
        ))
      }
      {
        inputs.map((item,index)=>(
          <InputInFlow object={item} key={index}/>
        ))
      }
      {
        <ButtonInFlow object={Buttonsone}/>
      } */}


    </div>
  )
}

export default WorkFlow
