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
                    (data?.progress?.startedCount || 0) - (data?.progress?.completedCount || 0), // Pending count (calculated by subtracting completed from total views)
                ],
                backgroundColor: ['#36A2EB', '#FF6384'], // Colors for each section
                borderColor: ['#ffffff', '#ffffff'], // Border color for sections
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.container}>
          <NavBar3 />
          {!loading && data?.progress?.viewCount === 0 ? (
            <div className={styles.noresponse}>No Response yet collected</div>
          ) : (
            <>
              <div className={styles.header}>
                <div className={styles.count}>
                  <p>Views:</p>
                  {loading ? (
                    <img src={Loading} className="loading" alt="loading" />
                  ) : (
                    data.progress.viewCount
                  )}
                </div>
                <div className={styles.count}>
                  <p>Starts:</p>
                  {loading ? (
                    <img src={Loading} className="loading" alt="loading" />
                  ) : (
                    data?.progress?.startedCount
                  )}
                </div>
              </div>
      
              <div className={styles.body}>
                {loading ? (
                  <img src={Loading} className="loading" alt="loading" />
                ) : (
                  <Table data={data} />
                )}
              </div>
      
              <div className={styles.footer}>
                {loading ? (
                  <img src={Loading} className="loading" alt="loading" />
                ) : (
                  <>
                    <div
                    className={styles.Doughnut}
                      style={{
                        width: '300px',
                        height: '300px',
                        margin: '0 auto',
                      }}
                    >
                      <Doughnut data={doughnutData} />
                      <div className={styles.count}>
                      <p>Completed:</p>
                      <p>
                        {data?.progress?.startedCount > 0
                          ? `${data?.progress?.completedCount}`
                          : 'N/A'}
                      </p>
                    </div>

                      <div className={styles.count}>
                      <p>Completion rate:</p>
                      <p>
                        {data?.progress?.startedCount > 0
                          ? `${(
                              (data?.progress?.completedCount /
                                data?.progress?.startedCount) *
                              100
                            ).toFixed(2)}%`
                          : 'N/A'}
                      </p>
                    </div>
                    </div>
                    
                  </>
                )}
              </div>
            </>
          )}
        </div>
      );
      }

export default withTheme(Response);
