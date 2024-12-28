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
import {toast} from 'react-toastify'
function FormSubmit() {
    const { FormId } = useParams();
    const [form, setForm] = useState({ name: '', elements: [] });
    const [renderPage, setRenderPage] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInputs, setUserInputs] = useState([]);
    const [firstValueChange,setFirstValueChange] = useState(false);

    const fetchForm = async () => {
        try {
            const response = await Api({
                endpoint: `/public/forms/${FormId}`,
                method: 'get',
            });
            setForm(response.data.form);
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    };
    const startCountUpdate = async() =>{
        try {
            const response = await Api({
                endpoint: `/public/forms/start/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }
    const viewCountUpdate = async() =>{
        try {
            const response = await Api({
                endpoint: `/public/forms/view/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }
    const completeCountUpdate = async() =>{
        try {
            const response = await Api({
                endpoint: `/public/forms/complete/${FormId}`,
                method: 'post',
            });
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    const submitForm = async(e) =>{
        e.preventDefault();
        try {
            const response = await Api({
                endpoint: `/public/forms/submit/${FormId}`,
                method: 'post',
                data:{data:userInputs}
            });
            if(response.status == 201){
                toast.success("Form submitted succesfully")
                completeCountUpdate();
            }
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    useEffect(() => {
        fetchForm();
        viewCountUpdate();
    }, []);

    // Handle saving input
    const handleSave = (value, label) => {
        setRenderPage((prevData) => [
            ...prevData,
            { type: 'userMessage', value, label }
        ]);

        setUserInputs((prevInputs) => [
            ...prevInputs,
            { label, value }
        ]);

        setCurrentIndex((prevIndex) => prevIndex + 1); 
        if(!firstValueChange){
            startCountUpdate();
            setFirstValueChange(true);
        }
    };

    useEffect(() => {
        if (form.elements.length > 0 && currentIndex < form.elements.length) {
            const element = form.elements[currentIndex];

            const isAlreadyRendered = renderPage.some(item => item.element && item.element.label === element.label);

            if (!isAlreadyRendered) {
                if (element.superType === 'Bubbles') {
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'bubble', element }
                    ]);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                }

                if (element.superType === 'Inputs') {
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'input', element }
                    ]);
                }
            }
        }
    }, [currentIndex, form]);

    return (
        <div className={Styles.container}>
            <h1>{form.name}</h1>
            {renderPage.map((item, index) => {
                if (item.type === 'input') {
                    const element = item.element;
                    return (
                        <div key={index} className={Styles.inputs}>
                            {element.type === 'Buttons' && (
                                <Buttons label={element.label} choices={element.buttonValues} onSave={handleSave} />
                            )}
                            {['Text', 'Date', 'Number', 'Email', 'Phone'].includes(element.type) && (
                                <InputText type={element.type} label={element.label} onSave={handleSave} />
                            )}
                            {element.type === 'Rating' && <Rating label={element.label} onSave={handleSave} />}
                        </div>
                    );
                }

                if (item.type === 'bubble') {
                    const element = item.element;
                    return (
                        <div key={index} className={Styles.bubbles}>
                            {element.type === 'Text' && <Text content={element.value} />}
                            {['Image', 'Gif'].includes(element.type) && <Image image={element.value} />}
                            {element.type === 'Video' && <Video video={element.value} />}
                            {!['Text', 'Image', 'Gif', 'Video'].includes(element.type) && (
                                <div>{element.label}</div> // Fallback for unsupported types
                            )}
                        </div>
                    );
                }
                return null;
            })}
            <button onClick={submitForm}>Submit</button>
        </div>
    );
}

export default FormSubmit;
