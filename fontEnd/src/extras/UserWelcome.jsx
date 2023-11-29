import React, { useEffect, useState } from 'react';
import Robot from "../assets/robot.gif";
import "./UserWelcome.css";
import { Logout } from '../components/Logout';
export const UserWelcome = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
            if (storedData) {
                const { username } = JSON.parse(storedData);
                setUserName(username);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <div className='userWelcomeContainer'>
                <img src={Robot} alt='Robot' />
                <h1>
                    Welcome, <span>{userName}!</span>
                </h1>
                <h3>Please select a chat to Start Messaging.</h3>
            </div>
        </>
    )
}
