import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import styled from "styled-components";
import "./Notifications.css";
export const Notifications = ({ allNotifications }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleIconClick = () => {
    setPopupVisible(!isPopupVisible);
  };
  // Import necessary styles or add inline styles in your component

  // Import necessary styles or add inline styles in your component

  return (
    <>
      <Button>
        <IoMdNotificationsOutline
          className="notification"
          onClick={handleIconClick}
        />
      </Button>
      {isPopupVisible && (
        <div className="popup">
          {allNotifications.length === 0 ? (
            <div className="noNotification">
            <p>no notification!</p>
            </div>
          ) : (
            <div className="notification-container">
              {allNotifications
                .slice()
                .reverse()
                .map((notification, index) => (
                  <div key={index} className="notification-item">
                    <p>
                      From: {notification.username}
                      <br />
                      Msg: {notification.msg}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  position: relative;
  svg {
    font-size: 1rem;
    color: #ebe7ff;
  }
`;
