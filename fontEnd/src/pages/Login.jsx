import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register-Login.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import logo from '../assets/logo.gif'
export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/')
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and password is required", toastOptions)
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required.", toastOptions)
      return false;
    }
    return true;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        })
        if (data.status === false) {
          toast.error(data.msg, toastOptions)
        }
        if (data.status === true) {
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.isUserValid));
          // console.log(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
          if(data.isUserValid.isAvatarImageSet===false){
            navigate("/setAvatar");
          }else if(data.isUserValid.customer===true){
            navigate("/company");
          }else{
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {/* <FormConstainer> */}
      <form className="form" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          {/* <img src={logo} alt='logo' /> */}
          <h1>ExpertCare Solutons</h1>
        </div>
        <input
          type="text"
          placeholder='Username'
          name='username'
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <input
          type="password"
          placeholder='Password'
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login User</button>
        <span>
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
        <ToastContainer />
      </form>
      {/* </FormConstainer> */}
    </>
  )
}
