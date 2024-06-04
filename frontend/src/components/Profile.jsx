import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import avt from '../assets/avt.png'
import { FaLaptopCode, FaFacebook } from "react-icons/fa6";
import { FaReact, FaHtml5, FaFacebookMessenger, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { SiTailwindcss } from "react-icons/si";

const Profile = () => {

    const titles = ["About Me", "My Info", "Get to know me"];
    const typingSpeed = 180;
    const eraseSpeed = 150;
    const eraseDelay = 1500;

    const [isTyping, setIsTyping] = useState(true);
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [eraseDelayed, setEraseDelayed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTyping) {
                if (currentCharIndex >= titles[currentTitleIndex]?.length) {
                    setIsTyping(false);
                    setTimeout(() => {
                        setEraseDelayed(true);
                    }, eraseDelay);
                } else if (titles[currentTitleIndex][currentCharIndex] === ' ') {
                    setCurrentCharIndex(prevCharIndex => prevCharIndex + 1); 
                } else {
                    setCurrentCharIndex(prevCharIndex => prevCharIndex + 1); 
                }
            } else if (eraseDelayed) {
                if (currentCharIndex === 0) {
                    setIsTyping(true);
                    setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
                    setEraseDelayed(false);
                } else {
                    setCurrentCharIndex(prevCharIndex => prevCharIndex - 1); 
                }
            }
        }, isTyping ? typingSpeed : eraseSpeed);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTitleIndex, currentCharIndex, isTyping, eraseDelayed]);

    const currentAnimatedTitle = titles[currentTitleIndex]?.slice(0, currentCharIndex);

    return (
        <div className="about-page">
            <div class="page-title-container">
                <h1 className="page-title">
                    {currentAnimatedTitle}
                </h1>
            </div>

            <div className="content">
                <div className="about-container">
                    <img src={avt} alt="Profile" className='profile' />
                    <div className="about">
                        <h2>I'm Huy Nguyen</h2>
                        <p>
                            Birthday: 20/05/2002
                            <br />
                            Address: Ha Dong, Ha Noi, Viet Nam
                            <br />
                            Senior student at PTIT
                            <div className='job'>Processing to be Front-End Developer
                                < FaLaptopCode size={31} />
                            </div>
                        </p>
                        <div className='tech'>
                            <div className='tech-txt'>
                                Skills:
                            </div>
                            <FaReact size={25} style={{ color: '#087ea4' }} className='tech-icon' />
                            <FaHtml5 size={25} style={{ color: '#f06427' }} className='tech-icon' />
                            <IoLogoCss3 size={25} style={{ color: '#005ce3' }} className='tech-icon' />
                            <SiTailwindcss size={25} style={{ color: '#00aac1' }} className='tech-icon' />
                        </div>
                        <div className="email">
                            Contact Me: <a href='https://www.google.com/intl/vi/gmail/about/' alt='email'>huynguyen2005@gmail.com
                            </a>
                            <br />
                            Or Tel: <a href='*' alt='tel'>+(84) 357 791 326</a>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="socials">
                    <i><FaFacebook size={30} /></i>
                    <i><FaFacebookMessenger size={30} /></i>
                    <i><FaInstagram size={30} /></i>
                    <i><FaTwitter size={30} /></i>
                </div>
                <p>Copyright ©2024, All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Profile;
