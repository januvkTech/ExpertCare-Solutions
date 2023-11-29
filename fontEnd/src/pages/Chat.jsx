import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.css";
import { Employees } from "../components/Employees";
import { employeesRoute, host } from "../utils/APIRoutes";
import { ChatContainer } from "../components/ChatContainer";
import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [showWlcm, setShowWlcm] = useState(true);
  const [recentNotifications, setRecentNotifications] = useState(null); //stores the notification infos
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(currentUser.customer)
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.post(
              `${employeesRoute}/${currentUser._id}`,
              {
                currentUser: currentUser,
              }
            );
            if (response) {
              setEmployees(response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setTimeout(fetchData, 1000);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchData();
  }, [currentUser, employees]);

  useEffect(() => {
    const func = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    func();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    // console.log(recentNotifications);
    if (recentNotifications) {
      const fromEmployee = employees.find(
        (employee) => employee._id === recentNotifications.from
      );
      setAllNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          ...recentNotifications,
          username: fromEmployee.username,
        },
      ]);
      if (fromEmployee) {
        const fromUsername = fromEmployee.username;
        toast(
          `Notification from ${fromUsername} message: ${recentNotifications.msg}`,
          toastOptions
        );
      } else {
        toast(
          `Notification from unknown user with ID ${recentNotifications.from} and message: ${recentNotifications.msg}`,
          toastOptions
        );
      }
    }
  }, [recentNotifications]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (employee) => {
    setCurrentChat(employee);
  };

  const handleWlcmPage = () => {
    console.log("clicked");
    setShowWlcm(true);
    console.log(showWlcm);
    // setCurrentChat(undefined);
  };

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat,recentNotifications]);
  return (
    <>
      <div className="chatContainer">
        <Employees
          employees={employees}
          currentUser={currentUser}
          changeChat={handleChatChange}
          showWlcmPage={handleWlcmPage}
          setShowWlcm={setShowWlcm}
          allNotifications={allNotifications}
        />
        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          socket={socket}
          showWlcm={showWlcm}
          setRecentNotifications={setRecentNotifications}
          // setAllNotifications={setAllNotifications}
        />
      </div>
      <ToastContainer />
    </>
  );
};
