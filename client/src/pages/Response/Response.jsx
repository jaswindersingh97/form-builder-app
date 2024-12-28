import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import styles from './styles.module.css';
import Table from './../../components/Table/Table';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Response() {
    const { formId } = useParams();
    const [data, setData] = useState({});

    const fetchData = async () => {
        const response = await Api({
            endpoint: `/secure/analytics/${formId}`,
            includeToken: true,
            method: 'get',
        });
        setData(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Prepare the data for the Doughnut chart
    const doughnutData = {
        labels: ['Completed', 'Pending'], // Labels for the sections
        datasets: [
            {
                label: 'Submission Progress',
                data: [
                    data?.progress?.completedCount || 0, // Completed count
                    (data?.progress?.viewCount || 0) - (data?.progress?.completedCount || 0), // Pending count (calculated by subtracting completed from total views)
                ],
                backgroundColor: ['#36A2EB', '#FF6384'], // Colors for each section
                borderColor: ['#ffffff', '#ffffff'], // Border color for sections
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.count}>
                    <p>Views:</p> {data?.progress?.viewCount}
                </div>
                <div className={styles.count}>
                    <p>Starts:</p> {data?.progress?.startedCount}
                </div>
                <div className={styles.count}>
                    <p>Completed:</p> {data?.progress?.completedCount}
                </div>
            </div>
            <div className={styles.body}>
                {data ? (
                    <>
                        <Table data={data} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className={styles.footer}>
            {data ? (
                    <>
                        <Doughnut data={doughnutData} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default withTheme(Response);
