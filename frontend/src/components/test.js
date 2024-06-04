import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Import Line component

const NUM_DATA_POINTS = 8;
const dataInterval = 3000; // Time difference between data points (in milliseconds)

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    // Customize format here (e.g., "HH:MM:SS" for time only)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const LineChart = () => {
    const [timestamps, setTimestamps] = useState(() => {
        return Array.from({ length: NUM_DATA_POINTS }, (_, i) => {
            return Date.now() - (i * dataInterval); // Simulate data collection in the past
        });
    });
    const formattedLabels = timestamps.slice().reverse().map(formatTimestamp); // Reverse timestamps before formatting labels

    const generateRandomData = () => {
        const newTimestamp = Date.now();
        const newDataPoint = Math.floor(Math.random() * 100);
        const data = {
            labels: formattedLabels,
            datasets: [
                {
                    label: 'Temp (Temperature)',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (40 - 10 + 1)) + 10), newDataPoint],
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.1)', // Temperature line color (red)
                    borderColor: 'rgba(255, 99, 132, 1)', // Temperature line border color (red)
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Humid (Humidity)',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (100 - 40 + 1)) + 40), newDataPoint], // Random humid (40 to 100)
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Humidity line color (blue)
                    borderColor: 'rgba(54, 162, 235, 1)', // Humidity line border color (blue)
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Light',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (300 - 100 + 1)) + 100), newDataPoint],
                    fill: false,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
            ],
        };
        return data;
    };

    const [chartData, setChartData] = useState(generateRandomData()); // Initial data with formatted labels

    useEffect(() => {
        const intervalId = setInterval(() => {
          const updatedData = generateRandomData();
          setChartData(updatedData); // Trigger re-render with updated data
        }, dataInterval);
    
        return () => clearInterval(intervalId); // Cleanup on unmount
      }, [dataInterval]);

    return (
        <Line data={chartData} options={options} />
    );
};

export default LineChart;

const options = {
    scales: {
        xAxes: [
            {
                type: 'time', // Use time scale for x-axis
                ticks: {
                    source: 'auto', // Automatically select major units (e.g., hours, minutes)
                  },
            },
        ],
    },
    // ... other chart options (e.g., limit x-axis labels if needed)
};