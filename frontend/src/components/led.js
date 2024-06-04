import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegLightbulb, FaPowerOff } from "react-icons/fa";
import off from '../assets/off.png';
import on from '../assets/on.png';

function Led() {
    const [isLedOn, setIsLedOn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedState = localStorage.getItem('isLedOn');
        if (savedState !== null) {
            setIsLedOn(JSON.parse(savedState));
        }
    }, []);

    const toggleDevice = async (mode) => {
        try {
            const response = await axios.post('http://localhost:4000/action/toggleDevice', {
                mode: mode,
                device: 'LED'
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("There was an error toggling the LED:", error);
            // setError("Failed to toggle the LED. Please try again.");
        }
    };

    const handleLedOn = () => {
        setIsLedOn(true);
        localStorage.setItem('isLedOn', true);
        toggleDevice('on');
    };

    const handleLedOff = () => {
        setIsLedOn(false);
        localStorage.setItem('isLedOn', false);
        toggleDevice('off');
    };

    return (
        <div className="led">
            <div className='title led-title'>
                <p>LED Controller</p>
                <FaRegLightbulb size={20} />
            </div>

            <div className="led-container">
                <img src={isLedOn ? on : off} id="led-off" alt="Led" />
            </div>
            <div className="led-button-container">
                <button
                    className={`turn-buttons ${isLedOn ? 'active' : ''}`}
                    id="led-on-button"
                    type="button"
                    onClick={handleLedOn}
                    disabled={isLedOn}
                >
                    <FaPowerOff size={14} className='turn-icons on' />
                    On
                </button>
                <button
                    className={`turn-buttons ${!isLedOn ? 'active' : ''}`}
                    id="led-off-button"
                    type="button"
                    onClick={handleLedOff}
                    disabled={!isLedOn}
                >
                    <FaPowerOff size={14} className='turn-icons off' />
                    Off
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Led;




// import React, { useState, useEffect } from 'react';
// import { FaRegLightbulb, FaPowerOff } from "react-icons/fa";
// import off from '../assets/off.png';
// import on from '../assets/on.png';

// function Led() {
//     const [isLedOn, setIsLedOn] = useState(false);

//     useEffect(() => {
//         const savedState = localStorage.getItem('isLedOn');
//         if (savedState !== null) {
//             setIsLedOn(JSON.parse(savedState));
//         }
//     }, []);

//     const handleLedOn = () => {
//         setIsLedOn(true);
//         localStorage.setItem('isLedOn', true);
        
//     };

//     const handleLedOff = () => {
//         setIsLedOn(false);
//         localStorage.setItem('isLedOn', false);
        
//     };

//     return (
//         <div className="led">
//             <div className='title led-title'>
//                 <p>Fan Controller</p>
//                 <FaRegLightbulb size={20} />
//             </div>

//             <div className="led-container">
//                 <img src={isLedOn ? on : off} id="led-off" alt="Led" />
//             </div>
//             <div className="led-button-container">
//                 <button
//                     className={`turn-buttons ${isLedOn ? 'active' : ''}`}
//                     id="led-on-button"
//                     type="button"
//                     onClick={handleLedOn}
//                     disabled={isLedOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons on' />
//                     On
//                 </button>
//                 <button
//                     className={`turn-buttons ${!isLedOn ? 'active' : ''}`}
//                     id="led-off-button"
//                     type="button"
//                     onClick={handleLedOff}
//                     disabled={!isLedOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons off' />
//                     Off
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Led;




// import React, { useState } from 'react';
// import { FaRegLightbulb } from "react-icons/fa";
// import off from '../assets/off.png';
// import on from '../assets/on.png'
// import { FaPowerOff } from "react-icons/fa6";

// function Led() {
//     const [isLedOn, setIsLedOn] = useState(false);

//     const handleLedOn = () => {
//         setIsLedOn(true);
//     };

//     const handleLedOff = () => {
//         setIsLedOn(false);
//     };

//     return (
//         <div className="led">
//             <div className='title led-title'>
//                 <p>Fan Controller</p>
//                 <FaRegLightbulb size={20} />
//             </div>

//             <div className="led-container">
//                 <img src={isLedOn ? on : off} id="led-off" alt="Led" />
//             </div>
//             <div className="led-button-container">
//                 <button
//                     className={`turn-buttons ${isLedOn ? 'active' : ''}`}
//                     id="led-on-button"
//                     type="button"
//                     onClick={handleLedOn}
//                     disabled={isLedOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons on' />
//                     On
                    
//                 </button>
//                 <button
//                     className={`turn-buttons ${!isLedOn ? 'active' : ''}`}
//                     id="led-off-button"
//                     type="button"
//                     onClick={handleLedOff}
//                     disabled={!isLedOn}
//                 >
//                     <FaPowerOff size={14} className='turn-icons off' />
//                     Off
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Led;
