import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/SetAvatar.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
// import { Buffer } from "buffer";

export const SetAvatar = () => {
    const navigate = useNavigate();
    const [avatarList, setAvatarList] = useState([]);
    const [image0Clicked, setImage0Clicked] = useState(false);
    const [image1Clicked, setImage1Clicked] = useState(false);
    const [image2Clicked, setImage2Clicked] = useState(false);
    const [image3Clicked, setImage3Clicked] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            navigate("/login");
    });

    useEffect(() => {
        const generateAvatar = async () => {
            const newAvatarList = [];
            for (let i = 0; i < 4; i++) {
                const randomInt = Math.floor(Math.random() * 1000);
                const avatarName = `https://api.multiavatar.com/774223${randomInt}.png`
                newAvatarList.push(avatarName);
            }
            setAvatarList(newAvatarList);
            // console.log(newAvatarList);
            setIsLoading(false);
            console.log(isLoading);
        };
        // setIsLoading(false);
        generateAvatar();
    }, []);

    const handleClick = (selectedImage) => {
        if (selectedImage === 0) {
            setImage0Clicked(!image0Clicked)
            setSelectedAvatar(avatarList[0]);
            if (image1Clicked === true) {
                setImage1Clicked(!image1Clicked);
            };
            if (image2Clicked === true) {
                setImage2Clicked(!image2Clicked);
            };
            if (image3Clicked === true) {
                setImage3Clicked(!image3Clicked);
            };
        } else if (selectedImage === 1) {
            setImage1Clicked(!image1Clicked)
            setSelectedAvatar(avatarList[1]);
            if (image0Clicked === true) {
                setImage0Clicked(!image0Clicked);
            };
            if (image2Clicked === true) {
                setImage2Clicked(!image2Clicked);
            };
            if (image3Clicked === true) {
                setImage3Clicked(!image3Clicked);
            };
        } else if (selectedImage === 2) {
            setImage2Clicked(!image2Clicked)
            setSelectedAvatar(avatarList[2]);
            if (image0Clicked === true) {
                setImage0Clicked(!image0Clicked);
            };
            if (image1Clicked === true) {
                setImage1Clicked(!image1Clicked);
            };
            if (image3Clicked === true) {
                setImage3Clicked(!image3Clicked);
            };
        } else if (selectedImage === 3) {
            setImage3Clicked(!image3Clicked)
            setSelectedAvatar(avatarList[3]);
            if (image0Clicked === true) {
                setImage0Clicked(!image0Clicked);
            };
            if (image1Clicked === true) {
                setImage1Clicked(!image1Clicked);
            };
            if (image2Clicked === true) {
                setImage2Clicked(!image2Clicked);
            };
        };
    };
    const handleSubmit = async () => {
        if (!selectedAvatar) {
            toast.error("Please select an avatar.", toastOptions);
        } else {
            try {
                const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
                const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                    image: selectedAvatar,
                });

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
                    navigate("/");
                } else {
                    toast.error("Error setting avatar. Please try again.", toastOptions);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <>
            {/* {isLoading === true && ( */}
            {isLoading ? (
                <div className='container'>
                    <img src={loader} alt='loader' className='loader' />
                </div>) : (
                <div className='container'>
                    <div className='title-container'>
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className='avatars'>
                        <div className={`set-avatar ${image0Clicked ? 'selected0' : ''}`}>
                            <img alt='avatar' src={avatarList[0]} onClick={() => { handleClick(0) }}></img>
                        </div>
                        <div className={`set-avatar ${image1Clicked ? 'selected1' : ''}`}>
                            <img alt='avatar' src={avatarList[1]} onClick={() => { handleClick(1) }}></img>
                        </div>
                        <div className={`set-avatar ${image2Clicked ? 'selected2' : ''}`}>
                            <img alt='avatar' src={avatarList[2]} onClick={() => { handleClick(2) }}></img>
                        </div>
                        <div className={`set-avatar ${image3Clicked ? 'selected3' : ''}`}>
                            <img alt='avatar' src={avatarList[3]} onClick={() => { handleClick(3) }}></img>
                        </div>
                    </div>
                    <button type="submit" onClick={() => handleSubmit()}>Continue</button>
                    <ToastContainer />
                </div>
            )}
        </>
    )
};
