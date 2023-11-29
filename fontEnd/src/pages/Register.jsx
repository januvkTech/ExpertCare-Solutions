import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register-Login.css";
import axios from "axios";
// import cors from "cors";
import { registerRoute } from '../utils/APIRoutes';
export const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        customer: "",
        companyName: "",
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
        const { password, confirmPassword, email, username, customer, companyName } = values;
        console.log(values)
        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same.", toastOptions)
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions)
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions)
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions)
            return false;
        } else if (customer === "") {
            toast.error("You must select the user type.", toastOptions)
            return false;
        } else if (customer === "false" && companyName === "") {
            toast.error("You must select a company name.", toastOptions)
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            // console.log("in validation", registerRoute)
            const { password, email, username, customer, companyName } = values;
            try {
                const { data } = await axios.post(registerRoute, {
                    username,
                    email,
                    password,
                    customer,
                    companyName,
                })
                if (data.status === false) {
                    toast.error(data.msg, toastOptions)
                }
                if (data.status === true) {
                    navigate("/setAvatar");
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
                    <img className="logo" src='' alt='' />
                    <h1>ExpertCare Solutons</h1>
                </div>
                <input
                    type="text"
                    placeholder='Username'
                    name='username'
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    onChange={(e) => handleChange(e)}
                />
                <div className="radio-group">
                    <label className='label'>Are you a customer ?</label>
                    <input
                        type="radio"
                        name="customer"
                        value="true"
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="customer"
                        value="false"
                        onChange={(e) => handleChange(e)}
                    />
                    <label>No</label>
                </div>
                {values.customer === "false" && (
                    <div className='select-group'>
                        <label for="companyName">Choose a company:</label>
                        <select id="companyName" name="companyName" onChange={(e) => handleChange(e)}>
                            <option value="">Select</option>
                            <option value="Company1">Company1</option>
                            <option value="Company2">Company2</option>
                            <option value="Company3">Company3</option>
                            <option value="Company4">Company4</option>
                        </select>
                    </div>
                )}

                <button type="submit">Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login</Link>
                </span>
                <ToastContainer />
            </form>
            {/* </FormConstainer> */}
        </>
    )
}
