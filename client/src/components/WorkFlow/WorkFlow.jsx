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
          return <p key={index}>Unsupported element</p>;
        })
      }

    </div>
  )
}

export default WorkFlow
