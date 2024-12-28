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
    const [renderPage, setRenderPage] = useState([]);  // Store rendered elements (bubbles + inputs)
    const [currentIndex, setCurrentIndex] = useState(0); // Track current element in the form array
    const [userInput, setUserInput] = useState(''); // User input state
    const [inputCompleted, setInputCompleted] = useState(false); // Track if input is completed

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

    // Handle save function that also advances to the next element
    const handleSave = (value, label) => {
        // Check if the label already exists in renderPage to prevent duplicates
        const labelExists = renderPage.some(item => item.element && item.element.label === label);
        if (labelExists) {
            console.log('This label already exists. Skipping insertion.');
            setCurrentIndex((prevIndex) => prevIndex + 1); // Explicitly move to the next element
            return; // Prevent adding the element if the label already exists
        }
    
        // Save the user input and proceed to next
        setRenderPage((prevData) => [
            ...prevData,
            { type: 'userMessage', value, label } // Save user input with the label
        ]);
        setInputCompleted(true); // Mark input as completed
    
        // Clear input and advance to the next form element
        setInputCompleted(false); // Reset the input completion state
        setUserInput(''); // Clear the user input
        setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next element in the form
    };
        
    // Handle user input change (for text-based inputs)
    const handleInputChange = (e) => {
        setUserInput(e.target.value); // Capture user input
    };

    // Render form elements based on currentIndex
    useEffect(() => {
        if (form.elements.length > 0 && currentIndex < form.elements.length) {
            const element = form.elements[currentIndex];

            // Check if the element has already been rendered to prevent duplicates
            const isAlreadyRendered = renderPage.some(item => item.element && item.element.label === element.label);

            if (!isAlreadyRendered) {
                if (element.superType === 'Bubbles') {
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'bubble', element } // Render the bubble immediately
                    ]);
                    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to next immediately
                }

                if (element.superType === 'Inputs' && !inputCompleted) {
                    // Render the input if it is the user's turn and input is not completed
                    setRenderPage((prev) => [
                        ...prev,
                        { type: 'input', element }
                    ]);
                }
            }
        }
    }, [currentIndex, form, inputCompleted]);

    return (
        <div className={Styles.container}>
            <h1>{form.name}</h1>

            {/* Render bubbles and inputs dynamically based on the renderPage state */}
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

                if (item.type === 'userMessage') {
                    return (
                        <div key={index} className={Styles.userMessage}>
                            <div className={Styles.userMessageContent}>
                                <strong>{item.label}: </strong>{item.value}
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default FormSubmit;
