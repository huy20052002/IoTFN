import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/dashboard.css';
import '../css/sensor.css';
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiSun } from "react-icons/fi";

const Sensor = () => {

    const [page, setPage] = useState(1);
    const limit = 10;

    const [sensorData, setSensorData] = useState({
        temperature: 0,
        humidity: 0,
        brightness: 0
    });

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/sensor/getAllSensors?page=${page}&limit=${limit}`); 
                if (response.data.sensorData.length > 0) {
                    const sensor = response.data.sensorData[0];
                    setSensorData({
                        temperature: sensor.temperature,
                        humidity: sensor.humidity,       
                        brightness: sensor.brightness              
                    });
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData();

        const intervalId = setInterval(fetchSensorData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='container'>
            <div className="temp" id="temperature">
                <div className='title sensor-title'>
                    <p>Temperature Sensor</p>
                    <FaTemperatureLow size={22} />
                </div>
                <span id="tempValue">{sensorData.temperature}°C</span>
            </div>

            <div className="humid" id="humidity">
                <div className='title'>
                    <p>Humidity Sensor</p>
                    <WiHumidity size={30} />
                </div>
                <span id="humidValue">{sensorData.humidity}%</span>
            </div>

            <div className="light" id="light">
                <div className='title sensor-title'>
                    <p>Light Sensor</p>
                    <FiSun size={24} />
                </div>
                <span id="lightValue">{sensorData.brightness} Lux</span>
            </div>
        </div>
    );
}

export default Sensor;




// import React from 'react'
// import '../css/dashboard.css'
// import '../css/sensor.css'
// import { FaTemperatureLow } from "react-icons/fa"
// import { WiHumidity } from "react-icons/wi";
// import { FiSun } from "react-icons/fi";

// const Sensor = () => {
    
//     return (
//         <div className='container'>
//             <div className="temp" id="temperature">
//                 <div className='title sensor-title'>
//                     <p>Temperature Sensor</p>
//                     <FaTemperatureLow size={22} />
//                 </div>
//                 <span id="tempValue">0°C</span>
//             </div>

//             <div className="humid" id="humidity">
//                 <div className='title'>
//                     <p>Humidity Sensor</p>
//                     <WiHumidity size={30} />
//                 </div>
//                 <span id="humidValue">0%</span>
//             </div>

//             <div className="light" id="light">
//                 <div className='title sensor-title'>
//                     <p>Light Sensor</p>
//                     <FiSun size={24} />
//                 </div>
//                 <span id="lightValue">0 Lux</span>
//             </div>
//         </div>
//     )
// }

// export default Sensor
