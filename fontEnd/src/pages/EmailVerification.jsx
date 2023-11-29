import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import { verifyRoute } from "../utils/APIRoutes";

export const EmailVerification = () => {
  const [validUrl, setValidUrl] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${verifyRoute}/${param.id}/${param.token}`;
        const { data } = await axios.post(url);
        if (data.status === true) {
          setValidUrl(true);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {loading ? (
        <p>Please wait...</p>
      ) : validUrl ? (
        <div className="container">
          <img src="" alt="success_img" className="success-image" />
          <h1>Email verified successfully</h1>
          <button className="loginLink">
            <Link to="/login">Login</Link>
          </button>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};
