import React, { useEffect, useState } from 'react';
import Styles from './FormSubmit.module.css';
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import Text from '../../components/Bubbles/Text/Text';
import Image from '../../components/Bubbles/Image/Image';
import Video from '../../components/Bubbles/Video/Video';
import Buttons from '../../components/Inputs/Buttons/Buttons';
import InputText from '../../components/Inputs/Text/Text';
import Rating from '../../components/Inputs/Rating/Rating';
function FormSubmit() {
    const { FormId } = useParams();
    const [form, setForm] = useState({ name: '', elements: [] });

    const fetchForm = async () => {
        try {
            const response = await Api({
                endpoint: `/public/forms/${FormId}`,
                method: 'get',
            });
            setForm(response.data.form);
            console.log(form)
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    };

    useEffect(() => {
        fetchForm();
    }, []);

    return (
        <div className={Styles.container}>
            <h1>{form.name}</h1>
            {form.elements.map((element, index) => {
                if(element.superType == 'Inputs'){
                  if(element.type =='Buttons'){
                    return(<Buttons key={index} array = {element.buttonValues}/>) // done fetching
                  }
                  if(element.type == 'Text' || element.type =='Date' || element.type =='Number' || element.type == 'Email' || element.type == 'Phone'){
                    return (<InputText key={index} type = {element.type}/>) // done fetching
                  }
                  if(element.type == 'Rating'){
                    return (<Rating key={index}/>) // done fetching
                  }
                  return <div key={index} className={Styles.inputs}>{element.label}</div> // falback not to used
                }
                else if(element.superType == 'Bubbles'){
                  if(element.type == 'Text'){
                    return (<Text content = {element.value} key={index}/>)  // done fetching
                  }
                  else if(element.type == 'Image' || element.type == 'Gif'){
                    return (<Image image={element.value} key={index}/>) // somewhat done lets check 
                  }
                  else if(element.type == 'Video'){
                    return (<Video video={element.value} key={index} />) // somewhat done lets check
                  }
                  else{
                    return <div className={Styles.bubbles} key={index}> {element.label}</div> // fallback
                  }
                }
            }
            )}
        </div>
    );
}

export default FormSubmit;
