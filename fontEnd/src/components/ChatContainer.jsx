import React, { useEffect, useState, useRef } from "react";
import "./ChatContainer.css";
import Robot from "../assets/robot.gif";
import { ChatInput } from "./ChatInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  showWlcm,
  setRecentNotifications,
}) => {
  //new state variables
  const [userName, setUserName] = useState(""); //stores the userName of the the user who is loged in
  const scrollRef = useRef(); //user to auto scroll the chat container down
  const [messages, setMessages] = useState([]); //stores the messages from the backend
  const [arrivalMessage, setArrivalMessage] = useState(null); //stores the arrived messages

  //to fatch the user info from the localstorage
  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (storedData) {
        const { username } = JSON.parse(storedData);
        setUserName(username);
      }
    };
    fetchData();
  }, []);

  //fetch the old messages from the backend
  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        try {
          const response = await axios.post(recieveMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchData();
  }, [currentChat]);

  //send message function nad store it in the backend
  const handleSendMsg = async (msg) => {
    try {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //display messages withoput refreshing the page
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if (!currentChat || showWlcm === true) {
          console.log("currentChat is undefined");
          setRecentNotifications({
            from: data.from,
            to: data.to,
            msg: data.msg,
          });
        } else {
          if (currentChat._id !== data.from) {
            console.log(currentChat._id);
            console.log(data.from);
            setRecentNotifications({
              from: data.from,
              to: data.to,
              msg: data.msg,
            });
          } else {
            console.log("failed");
            setArrivalMessage({
              fromSelf: false, 
              message: data.msg,
              sender: data.from,
            });
            setRecentNotifications(undefined);
          }
        }
      });
    }
  });
  

  //set the arrived message to the message state veriable(hook)
  useEffect(() => {
    if (arrivalMessage !== null) {
      if (arrivalMessage.sender === currentChat._id) {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  //auto scroll useEffect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // console.log(currentChat);
    // console.log(showWlcm);
  }, [messages]);

  return (
    <>
      {currentChat === undefined || showWlcm === true ? (
        <div className="userWelcomeContainer">
          <img src={Robot} alt="Robot" />
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h3>Please select a chat to Start Messaging.</h3>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <div className="user-details">
              <div className="chat-container-avatar">
                <img src={currentChat.avatarImage} alt="avatar" />
              </div>
              <div className="chat-container-username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-input">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </>
  );
};
