import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/header.css';
import ptit from '../assets/PTIT.png'
import { IconContext } from 'react-icons';
import { FaHome, FaUser } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { BsDeviceSsd } from "react-icons/bs";

const Header = () => {
    const location = useLocation();

    useEffect(() => {

    }, []);

    const tabs = [
        { path: '/', label: 'Dashboard', icon: FaHome },
        { path: '/data', label: 'Data Sensor', icon: BsDeviceSsd },
        { path: '/history', label: 'History', icon: SlNotebook },
        { path: '/profile', label: 'Profile', icon: FaUser },
    ];

    return (
        <div className='header'>
            <div className='header-container'>
                <div className='header-title'>
                    <img src={ptit} className='logo' alt="logo" />
                    <h1>IoT UI</h1>
                </div>
                <nav>
                    <ul className="nav-buttons">
                        {tabs.map((tab) => (
                            <li key={tab.path}>
                                <Link
                                    to={tab.path}
                                    className={`tab-button ${location.pathname === tab.path ? 'active' : ''}`}
                                    disabled={location.pathname === tab.path}
                                >
                                    <IconContext.Provider value={{ size: '1em' }}>
                                        <tab.icon className="header-icon" />
                                    </IconContext.Provider>
                                    {tab.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;

