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
    const { FormId } = useParams(); // Form Id
    const [form, setForm] = useState({ name: '', elements: [] });
    const [renderPage, setRenderPage] = useState([]); // Store rendered elements (bubbles + inputs)
    const [currentIndex, setCurrentIndex] = useState(0); // Track current element in the form array
    const [userInput, setUserInput] = useState(''); // User input state

    // State to store inputs as an array of objects: { label, value }
    const [userInputs, setUserInputs] = useState([]);

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

    useEffect(() => {
        fetchForm();
    }, []);

    // Handle saving input
    const handleSave = (value, label) => {
        setRenderPage((prevData) => [
            ...prevData,
            { type: 'userMessage', value, label }
        ]);

        // Add the value to the userInputs array with label and value
        setUserInputs((prevInputs) => [
            ...prevInputs,
            { label, value }
        ]);

        setUserInput(''); // Clear input field
        setCurrentIndex((prevIndex) => prevIndex + 1); // Move to next element
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value); // Handle input change
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
                                <InputText type={element.type} label={element.label} onSave={handleSave} onChange={handleInputChange} value={userInput} />
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
        </div>
    );
}

export default FormSubmit;
