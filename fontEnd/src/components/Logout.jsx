import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from 'axios';
import { logoutRoute } from '../utils/APIRoutes';
export const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const {data} = await axios.get(`${logoutRoute}/${id}`);
    // console.log(logoutResponse);
    if (data.status === true) {
      // console.log("hello from if condition.")
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1rem;
    color: #ebe7ff;
  }
`;