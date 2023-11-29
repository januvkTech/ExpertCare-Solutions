import React, { useEffect, useState } from "react";
import "./Employees.css";
import { Logout } from "./Logout";
import { Notifications } from "./Notifications";

export const Employees = ({
  employees,
  currentUser,
  changeChat,
  showWlcmPage,
  setShowWlcm,
  allNotifications,
}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (employee, index) => {
    setCurrentSelected(index);
    changeChat(employee);
    setShowWlcm(false);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="employees-container">
          <div className="brand">
            <img className="logo" src="" alt="" />
            <h3
              onClick={() => {
                showWlcmPage();
                setCurrentSelected(undefined);
              }}
            >
              ExpertCare Solutions
            </h3>
            <br />
            <h>{currentUser.company}</h>
          </div>

          {employees.length > 0 ? (
            <div className="employees">
              {employees.map((employee, index) => (
                <div
                  className={`employee ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(employee, index)}
                >
                  <div className="chatavatar">
                    <img
                      style={{
                        border: `2px solid ${
                          employee.active ? "green" : "red"
                        }`,
                      }}
                      src={employee.avatarImage}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{employee.username}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-employees-message">
              <p>No employees are available currently.</p>
            </div>
          )}

          <div className="current-user">
            <div className="useravatar">
              <img src={currentUserImage} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout />
            <Notifications allNotifications={allNotifications} />
          </div>
        </div>
      )}
    </>
  );
};
