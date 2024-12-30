import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import styles from './styles.module.css';
import Table from './../../components/Table/Table';
import Loading from './../../assets/Loading/loading.gif'
import NavBar3 from '../../components/NavBar3/NavBar3';
// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Response() {
    const {  FormId } = useParams();
    const [data, setData] = useState({});

    const [loading,setLoading] = useState(true);
    const fetchData = async () => {
        const response = await Api({
            endpoint: `/secure/analytics/${FormId}`,
            includeToken: true,
            method: 'get',
        });
        setData(response.data);
        setLoading(false);
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
            <NavBar3/>
            <div className={styles.header}>
                <div className={styles.count}>
                    <p>Views:</p> {!loading ? data.progress.viewCount :
                    <img src={Loading} className='loading' alt='loading'/>
                     }
                </div>
                <div className={styles.count}>
                    <p>Starts:</p> {!loading ?
                     data?.progress?.startedCount :
                        <img src={Loading} className='loading' alt='loading'/>
                    }
                </div>
                <div className={styles.count}>
                    <p>Completed:</p> {!loading ?
                        data?.progress?.completedCount:
                        <img src={Loading} className='loading' alt='loading'/>
                        }
                </div>
            </div>
            <div className={styles.body}>
                {!loading ? (
                    <>
                        <Table data={data} />
                    </>
                ) : (
                    <img src={Loading} className='loading' alt='loading'/>

                )}
            </div>
            <div className={styles.footer}>
            {!loading ? (
                    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                        <Doughnut data={doughnutData} />
                    </div>
                ) : (
                    <img src={Loading} className='loading' alt='loading'/>
                )}
            </div>
        </div>
    );
}

export default withTheme(Response);
