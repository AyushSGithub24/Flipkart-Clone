import React from "react"
import "./LoginForm.css"
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { useAuth } from './../Contexts/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const {login,setIsLoggedIn}=useAuth();


  const handleGoogleLogin = async () => {
    try {
      // Initiating Google OAuth flow by redirecting to backend OAuth URL
      window.location.href = "http://localhost:3000/auth/google"; // Redirect to backend OAuth route
    } catch (err) {
      console.error("Google login failed", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, navigate to the home page
        const data = await response.json();
        login(data.accessToken)
        console.log(data);
        if(data.refreshToken){
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        setIsLoggedIn(true)
        navigate("/");
      } else {
        // Handle authentication errors
        const data = await response.json();
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="login-form">
      <div className="login-info">
        <h1>Looks like you're</h1>
        <h1>new here!</h1>
        <p>Sign in with your Email to get started</p>
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Login illustration"
          className="login-image"
        />
      </div>
        <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <Link to="/forget" className="forget">
      Forget Password
        </Link>
      <p className="terms">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
      <button type="submit" className="btn">
        Login
      </button>
  
        <Link to="/signup" className="create-account">
          New to Flipkart? Create an account
        </Link>
        <br />
        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>
       
        </form>
    </div>
  )
}

export default LoginForm

