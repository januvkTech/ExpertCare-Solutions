import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CompanySelection.css"
export const CompanySelection = () => {
    const navigate = useNavigate();
    const [companyList, setCompanyList] = useState([]);
    const [company1Clicked, setCompany1Clicked] = useState(false);
    const [company2Clicked, setCompany2Clicked] = useState(false);
    const [company3Clicked, setCompany3Clicked] = useState(false);
    const [company4Clicked, setCompany4Clicked] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            navigate("/login");
    }, []);
    useEffect(() => {
        setCompanyList([
            'https://1000logos.net/wp-content/uploads/2017/02/HP-Logo-2012-768x432.png',
            'https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo-1993-768x432.png',
            'https://1000logos.net/wp-content/uploads/2017/06/Symbol-Sony-768x256.jpg',
            'https://1000logos.net/wp-content/uploads/2017/02/Intel-Logo-2005-606x400.png'
        ]);
    }, []);
    const handleClick = (Company) => {
        if (Company === 0) {
            setCompany1Clicked(!company1Clicked)
            setSelectedCompany("Company1");
            if (company2Clicked === true) {
                setCompany2Clicked(!company2Clicked);
            };
            if (company3Clicked === true) {
                setCompany3Clicked(!company3Clicked);
            };
            if (company4Clicked === true) {
                setCompany4Clicked(!company4Clicked);
            };
        } else if (Company === 1) {
            setCompany2Clicked(!company2Clicked)
            setSelectedCompany("Company2");
            if (company1Clicked === true) {
                setCompany1Clicked(!company1Clicked);
            };
            if (company3Clicked === true) {
                setCompany3Clicked(!company3Clicked);
            };
            if (company4Clicked === true) {
                setCompany4Clicked(!company4Clicked);
            };
        } else if (Company === 2) {
            setCompany3Clicked(!company3Clicked)
            setSelectedCompany("Company3");
            if (company1Clicked === true) {
                setCompany1Clicked(!company1Clicked);
            };
            if (company2Clicked === true) {
                setCompany2Clicked(!company2Clicked);
            };
            if (company4Clicked === true) {
                setCompany4Clicked(!company4Clicked);
            };
        } else if (Company === 3) {
            setCompany4Clicked(!company4Clicked)
            setSelectedCompany("Company4");
            if (company1Clicked === true) {
                setCompany1Clicked(!company1Clicked);
            };
            if (company2Clicked === true) {
                setCompany2Clicked(!company2Clicked);
            };
            if (company3Clicked === true) {
                setCompany3Clicked(!company3Clicked);
            };
        };
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleSubmit = async () => {
        if (company1Clicked !== true && company2Clicked !== true && company3Clicked !== true && company4Clicked !== true) {
            setSelectedCompany(null);
            toast.error("Please select a company.", toastOptions);
            // console.log("clicked withouyt selecting")
        } else {
            console.log(selectedCompany);
            const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            //    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.isUserValid));
            user.company = selectedCompany;
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
            // console.log(user);
            navigate("/");
        };
    };
    return (
        <>
            <div className='container'>
                <div className='title-container'>
                    <h1>Pick a Company for the customer care service.</h1>
                </div>
                <div className='companies'>
                    <div className={`set-company ${company1Clicked ? 'selected0' : ''}`}>
                        <img alt='company1' src={companyList[0]} onClick={() => { handleClick(0) }}></img>
                    </div>
                    <div className={`set-company ${company2Clicked ? 'selected1' : ''}`}>
                        <img alt='company2' src={companyList[1]} onClick={() => { handleClick(1) }}></img>
                    </div>
                    <div className={`set-company ${company3Clicked ? 'selected2' : ''}`}>
                        <img alt='company3' src={companyList[2]} onClick={() => { handleClick(2) }}></img>
                    </div>
                    <div className={`set-company ${company4Clicked ? 'selected3' : ''}`}>
                        <img alt='company4' src={companyList[3]} onClick={() => { handleClick(3) }}></img>
                    </div>
                </div>
                <button type="submit" onClick={() => handleSubmit()}>Continue</button>
                <ToastContainer />
            </div>
        </>
    )
}
