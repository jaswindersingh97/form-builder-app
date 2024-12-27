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
    const [formData, setFormData] = useState([]);

    const fetchForm = async () => {
        try {
            const response = await Api({
                endpoint: `/public/forms/${FormId}`,
                method: 'get',
            });
            setForm(response.data.form);
            console.log(form);
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    };

    useEffect(() => {
        fetchForm();
    }, []);

    useEffect(()=>{
        console.log(formData)
    },[formData])
    const handleSave = (value, label) => {
        setFormData((prevData) => [
          ...prevData,
          { label, value }
        ]);
      };
    

    return (
        <div className={Styles.container}>
            <h1>{form.name}</h1>
            {form.elements.map((element, index) => {
                if (element.superType === 'Inputs') {
                    return (
                        <div key={index} className={Styles.inputs}>
                            {element.type === 'Buttons' && (
                                <Buttons key={index} label={element.label} choices={element.buttonValues} onSave={handleSave}  />
                            )}
                            {['Text', 'Date', 'Number', 'Email', 'Phone'].includes(element.type) && (
                                <InputText key={index} type={element.type} label={element.label} onSave={handleSave}  />
                            )}
                            {element.type === 'Rating' && <Rating key={index} label={element.label} onSave={handleSave}  />}
                            {!['Buttons', 'Text', 'Date', 'Number', 'Email', 'Phone', 'Rating'].includes(element.type) && (
                                <div>{element.label}</div> // Fallback
                            )}
                        </div>
                    );
                } else if (element.superType === 'Bubbles') {
                    return (
                        <div key={index} className={Styles.bubbles}>
                            {element.type === 'Text' && <Text content={element.value} />}
                            {['Image', 'Gif'].includes(element.type) && (
                                <Image image={element.value} />
                            )}
                            {element.type === 'Video' && <Video video={element.value} />}
                            {!['Text', 'Image', 'Gif', 'Video'].includes(element.type) && (
                                <div>{element.label}</div> // Fallback
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}

export default FormSubmit;
