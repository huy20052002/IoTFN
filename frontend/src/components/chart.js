import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const dataInterval = 5000;

const LineChart = () => {

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [page, setPage] = useState(1);
    const limit = 10;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/sensor/getAllSensors?page=${page}&limit=${limit}`);
                const data = await response.json();
                const formattedData = formatSensorData(data.sensorData);
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, dataInterval);

        return () => clearInterval(intervalId);
    }, []);

    function formatSensorData(sensorData) {
        const labels = sensorData.map(sensor => formatTimestamp(sensor.datetime)).reverse();

        const tempData = sensorData.map(sensor => sensor.temperature).reverse();
        const humidData = sensorData.map(sensor => sensor.humidity).reverse();
        const lightData = sensorData.map(sensor => sensor.brightness).reverse();

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Temp (Temperature)',
                    data: tempData,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Humid (Humidity)',
                    data: humidData,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Light',
                    data: lightData,
                    fill: false,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
            ],
        };
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const options = {
        scales: {
            xAxes: [
                {
                    type: 'time',
                    ticks: {
                        source: 'auto',
                    },
                },
            ],
        },
    };

    return (
        <Line data={chartData} options={options} />
    );
};

export default LineChart;




// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';

// const NUM_DATA_POINTS = 6;
// const dataInterval = 5000;

// const LineChart = () => {
//     const [chartData, setChartData] = useState(generateRandomData());

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setChartData(generateRandomData());
//         }, dataInterval);

//         return () => clearInterval(intervalId);
//     }, []);

//     function generateRandomData() {
//         const timestamps = Array.from({ length: NUM_DATA_POINTS }, (_, i) => {
//             return Date.now() - (i * dataInterval);
//         });

//         const formattedLabels = timestamps.slice().reverse().map(formatTimestamp);

//         const newDataPoint = Math.floor(Math.random() * 100);

//         const data = {
//             labels: formattedLabels,
//             datasets: [
//                 {
//                     label: 'Temp (Temperature)',
//                     data: [...timestamps.map(() => Math.floor(Math.random() * (40 - 10 + 1)) + 10), newDataPoint],
//                     fill: false,
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//                 {
//                     label: 'Humid (Humidity)',
//                     data: [...timestamps.map(() => Math.floor(Math.random() * (100 - 40 + 1)) + 40), newDataPoint],
//                     fill: false,
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//                 {
//                     label: 'Light',
//                     data: [...timestamps.map(() => Math.floor(Math.random() * (300 - 100 + 1)) + 100), newDataPoint],
//                     fill: false,
//                     backgroundColor: 'rgba(255, 215, 0, 0.2)',
//                     borderColor: 'rgba(255, 215, 0, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//             ],
//         };
//         return data;
//     }

//     return (
//         <Line data={chartData} options={options} />
//     );
// };

// const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// };

// const options = {
//     scales: {
//         xAxes: [
//             {
//                 type: 'time',
//                 ticks: {
//                     source: 'auto',
//                 },
//             },
//         ],
//     },
// };

// export default LineChart;
