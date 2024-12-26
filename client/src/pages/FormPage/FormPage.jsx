import React,{useEffect} from 'react';
import NavBar2 from '../../components/NavBar2/NavBar2';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import WorkFlow from '../../components/WorkFlow/WorkFlow';
import styles from './style.module.css';
import { buttons, Date, Email, Gif, Image, Number, Phone, Rating, TextBubble, Textinput, Video } from './../../assets/FormPage';
import { useForm } from '../../context/FormContext';
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';

function FormPage({ mode }) {
  const {FormId} = useParams();
  const { form, setForm } = useForm();
  
  const fetchForm = async(id)=>{
    const response = await Api({
      endpoint:`/public/forms/${id}`,
      method:"get",
      includeToken:false,
    })
    setForm(response.data.form);
    console.log(response)
  }

  useEffect(()=>{
    if(mode=='edit'){
      fetchForm(FormId);
    }
  },[FormId])

  // Function to handle adding a field
const addElement = (name, superType) => {
  const count = form.elements.filter(
    element => element.type === name && element.superType === superType
  ).length + 1; // Count elements with the same type AND superType

  // Determine the initial value type (array or string) based on the name or superType
  const isArrayType = name === "Buttons"; // Example: Use array for "Buttons"
  const newElement = { 
    label: `${superType} ${name} ${count}`, 
    superType, 
    type: name, 
    value:  "", // String for general cases
    buttonValues: name === "Buttons" ? [] : undefined // Array only for buttons
  };


  setForm(prev => ({
    ...prev,
    elements: [...prev.elements, newElement]
  }));
};

  const Bubbles = [
    { name: "Text", icon: TextBubble },
    { name: "Image", icon: Image },
    { name: "Video", icon: Video },
    { name: "Gif", icon: Gif }
  ];

  const inputs = [
    { name: "Text", icon: Textinput },
    { name: "Number", icon: Number },
    { name: "Email", icon: Email },
    { name: "Phone", icon: Phone },
    { name: "Date", icon: Date },
    { name: "Rating", icon: Rating },
    { name: "Buttons", icon: buttons }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavBar2 />
        <hr />
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.Title}>
            <h3>Bubbles</h3>
          </div>
          <div className={styles.Fields}>
            {Bubbles.map((Bubble, index) => (
              <div 
                key={index} 
                className={styles.Field}
                onClick={() => addElement(Bubble.name,"Bubbles")}
              >
                <img src={Bubble.icon} alt={Bubble.name} />
                <span>{Bubble.name}</span>
              </div>
            ))}
          </div>
          <div className={styles.Title}>
            <h3>Inputs</h3>
          </div>
          <div className={styles.Fields}>
            {inputs.map((input, index) => (
              <div 
                key={index} 
                className={styles.Field}
                onClick={() => addElement(input.name,"Inputs")}
              >
                <img src={input.icon} alt={input.name} />
                <span>{input.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <WorkFlow />
        </div>
      </div>
    </div>
  );
}

export default withTheme(FormPage);
