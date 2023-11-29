import React, { useState, useEffect } from 'react'
// import styled from "styled-components";
import "./ChatInput.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
export const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
        console.log(emojiObject);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }

    // useEffect(() => {
    //     console.log('Updated Message:', msg);
    // }, [msg]);
    return (
        <div className='chatinput-container'>
            {/* <Container> */}
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='chatinput-form' onSubmit={(e)=>{sendChat(e)}}>
                <input className="input" type='text' placeholder='type your text here' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
                <button className='chatinput-submit' type="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
        // </Container>
    )
}
