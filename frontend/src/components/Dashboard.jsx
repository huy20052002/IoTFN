/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import '../css/dashboard.css'
import fan from '../assets/fan-off.png'
import Led from './led.js'
import Fan from './fan.js'
import { FaRegLightbulb, FaRegChartBar } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import Chart from 'chart.js/auto';
import LineChart from './chart.js';

const Dashboard = () => {

    // const [isOn, setIsOn] = useState(false);

    // const handleOnButtonClick = () => {
    //     setIsOn(true); // Set On button active
    // };

    // const handleOffButtonClick = () => {
    //     setIsOn(false); // Set Off button active
    // };


    return (
        <div className="container">
            <div className="chart" id="chartContainer">
                <div className='title chart-title'>
                    <p>Chart</p>
                    <FaRegChartBar size={24} />
                </div>
                <div className="chart-section">
                    <LineChart />
                </div>
            </div>
            <Led />
            <Fan />
            
            {/* <div className="led">
                <div className='title led-title'>
                    <p>Led Controller</p>
                    <FaRegLightbulb size={20} />
                </div>
                <div className="led-container">
                    <img id="bulb-off" src={off} alt="Bulb Off" />
                </div>
                <div className="led-button">
                    <button className="turn-buttons" id="led-on-button" type="button" >On</button>
                    <button className="turn-buttons" id="led-off-button" type="button" >Off</button>
                </div>
            </div> */}
         
            {/* <div className="led">
                <div className='title led-title'>
                    <p>Fan Controller</p>
                    <FaRegLightbulb size={20} />
                </div>
                <div className="led-container">
                    <img
                        id="fan-blade-off"
                        src={fan}
                        alt="Fan Off"
                        className={isOn ? 'fan-on' : 'fan-off'}
                        style={{ transform: isOn ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>
                <div className="led-button-container">
                    <button
                        className={isOn ? 'turn-buttons active' : 'turn-buttons'}
                        id="fan-on-button"
                        type="button"
                        onClick={handleOnButtonClick}
                        disabled={isOn} // Disable the On button if isOn is true
                    >
                        <FaPowerOff size={14} className='turn-icons on' />
                        On
                    </button>
                    <button
                        className={!isOn ? 'turn-buttons active' : 'turn-buttons'}
                        id="fan-off-button"
                        type="button"
                        onClick={handleOffButtonClick}
                        disabled={!isOn} // Disable the Off button if isOn is false
                    >
                        <FaPowerOff size={14} className='turn-icons off' />
                        Off
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default Dashboard
