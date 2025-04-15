import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // Ensuring it's always an object
  const navigate = useNavigate();
  const url=import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError("");

    const requestBody = { name, email, password };
    console.log("Request body:", requestBody); // Debugging log

    try {
      const response = await fetch(url+"/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json(); // Always parse JSON first

      if (!response.ok) {
        // If response status is not 200-299, handle the error
        console.log("Signup failed:", data);
        if(data.message=="Email already in use"){
          navigate("/login");
          alert("Account already exist go to forget password or Login with google")
        }
        setError(data.message || "Invalid email or password");
        setErrors(data.errors || {}); // Ensure it's always an object
      } else {
        // Signup successful
        navigate("/login");
        alert("Account Created")
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <div className="login-info">
        <h1>Looks like you're</h1>
        <h1>new here!</h1>
        <p>Sign up with your Email to get started</p>
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Login illustration"
          className="login-image"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
          {errors.name && <p className="error-message">{errors.name[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          {errors.email && <p className="error-message">{errors.email[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          {errors.password && <p className="error-message">{errors.password[0]}</p>}
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="terms">
          By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
        </p>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
