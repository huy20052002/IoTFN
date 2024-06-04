import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPowerOff, FaRegLightbulb } from 'react-icons/fa';
import fan from '../assets/fan-off.png'; 

function Fan() {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isOn) {
            intervalId = setInterval(() => {
                rotateFanBlade();
            }, 10); 
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isOn]);

    useEffect(() => {
        const savedState = localStorage.getItem('isOn');
        if (savedState !== null) {
            setIsOn(JSON.parse(savedState));
        }
    }, []);

    const handleFanOnButton = async () => {
        try {
            const response = await axios.post('http://localhost:4000/action/toggleDevice', {
                mode: 'on',
                device: 'Fan'
            });
            console.log('Fan turned on:', response.data);
            setIsOn(true); 
            localStorage.setItem('isOn', true);
        } catch (error) {
            console.error("Error toggling fan on:", error);
        }
    };

    const handleFanOffButton = async () => {
        try {
            const response = await axios.post('http://localhost:4000/action/toggleDevice', {
                mode: 'off',
                device: 'Fan'
            });
            console.log('Fan turned off:', response.data);
            setIsOn(false); 
            localStorage.setItem('isOn', false);
        } catch (error) {
            console.error("Error toggling fan off:", error);
        }
    };

    const rotateFanBlade = () => {
        const fanBlade = document.getElementById('fan-off');
        if (fanBlade) {
            const rotation = parseInt(fanBlade.style.transform.replace('rotate(', '').replace('deg)', ''), 10) || 0;
            fanBlade.style.transform = `rotate(${rotation + 5}deg)`;
        }
    };

    return (
        <div className="led">
            <div className='title led-title'>
                <p>Fan Controller</p>
                <FaRegLightbulb size={20} />
            </div>
            <div className="led-container">
                <img
                    id="fan-off"
                    src={fan}
                    alt="Fan"
                    className={isOn ? 'fan-on' : 'fan-off'}
                />
            </div>
            <div className="led-button-container">
                <button
                    className={isOn ? 'turn-buttons active' : 'turn-buttons'}
                    id="fan-on-button"
                    type="button"
                    onClick={handleFanOnButton}
                    disabled={isOn}
                >
                    <FaPowerOff size={14} className='turn-icons on' />
                    On
                </button>
                <button
                    className={!isOn ? 'turn-buttons active' : 'turn-buttons'}
                    id="fan-off-button"
                    type="button"
                    onClick={handleFanOffButton}
                    disabled={!isOn}
                >
                    <FaPowerOff size={14} className='turn-icons off' />
                    Off
                </button>
            </div>
        </div>
    );
}

export default Fan;





// import React, { useState, useEffect } from 'react';
// import { FaPowerOff, FaRegLightbulb } from 'react-icons/fa';
// import fan from '../assets/fan-off.png'; 

// function Fan() {
//     const [isOn, setIsOn] = useState(false);

//     useEffect(() => {
//         let intervalId;
//         if (isOn) {
//             intervalId = setInterval(() => {
//                 rotateFanBlade();
//             }, 10); 
//         } else {
//             clearInterval(intervalId);
//         }
//         return () => clearInterval(intervalId);
//     }, [isOn]);

//     useEffect(() => {
//         const savedState = localStorage.getItem('isOn');
//         if (savedState !== null) {
//             setIsOn(JSON.parse(savedState));
//         }
//     }, []);

//     const handleFanOnButton = () => {
//         setIsOn(true); 
//         localStorage.setItem('isOn', true);
//     };

//     const handleFanOffButton = () => {
//         setIsOn(false); 
//         localStorage.setItem('isOn', false);
//     };

//     const rotateFanBlade = () => {
//         const fanBlade = document.getElementById('fan-off');
//         if (fanBlade) {
//             const rotation = parseInt(fanBlade.style.transform.replace('rotate(', '').replace('deg)', ''), 10) || 0;
//             fanBlade.style.transform = `rotate(${rotation + 5}deg)`;
//         }
//     };

//     return (
//         <div className="led">
//             <div className='title led-title'>
//                 <p>Fan Controller</p>
//                 <FaRegLightbulb size={20} />
//             </div>
//             <div className="led-container">
//                 <img
//                     id="fan-off"
//                     src={fan}
//                     alt="Fan"
//                     className={isOn ? 'fan-on' : 'fan-off'}
//                 />
//             </div>
//             <div className="led-button-container">
//                 <button
//                     className={isOn ? 'turn-buttons active' : 'turn-buttons'}
//                     id="fan-on-button"
//                     type="button"
//                     onClick={handleFanOnButton}
//                     disabled={isOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons on' />
//                     On
//                 </button>
//                 <button
//                     className={!isOn ? 'turn-buttons active' : 'turn-buttons'}
//                     id="fan-off-button"
//                     type="button"
//                     onClick={handleFanOffButton}
//                     disabled={!isOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons off' />
//                     Off
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Fan;
