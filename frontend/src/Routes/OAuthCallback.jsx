// OAuthCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAuth } from "../Contexts/AuthContext";
import "./OAuth.css"
const OAuthCallback = () => {
  const navigate = useNavigate();
 const {login,setIsLoggedIn}=useAuth();
  useEffect(() => {
    // Capture the token from the URL (after Google redirects back)
    
    const queries = queryString.parse(window.location.search);
    const token=queries.accessToken
    const refreshToken=queries.refreshToken
    localStorage.setItem("refreshToken", refreshToken);
    // console.log("query parmeter",queries);
    // console.log("refresh token "+refreshToken);
    if (token) {
      // Store the token in localStorage
      login(token)
      setIsLoggedIn(true)
      // Redirect the user to the home page
      navigate("/");
    } else {
      console.error("OAuth login failed");
    }
  }, [navigate]);

  return(
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  }}
>
  <div className="loader"></div>
</div>


)
};



export default OAuthCallback