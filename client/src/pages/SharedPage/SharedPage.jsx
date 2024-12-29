import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../../Api/Api';
import { toast } from 'react-toastify';

function SharedPage() {
    const { data } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function

    const getRights = async () => {
        try {
            const response = await Api({
                endpoint: `/secure/dashboard/verifyLink/${data}`,
                includeToken: true,
                method: 'get'
            });

            if (response.status === 200) {
                toast.success("Rights allocated to user, redirecting in 3 seconds...");
                setTimeout(() => {
                    navigate('/workspace'); // Redirect to the /workspace page
                }, 3000); // 3 seconds delay
            }
        } catch (error) {
            toast.error("Failed to allocate rights. Please try again.");
            console.error("Error fetching rights:", error);
        }
    };

    useEffect(() => {
        getRights();
    }, []); // Run on mount

    return (
        <div>
        </div>
    );
}

export default SharedPage;
