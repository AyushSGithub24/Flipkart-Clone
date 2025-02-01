import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [email, setEmail] = useState("");
  const [hideEmail, setHideEmail] = useState(true);
  const [hideVerify, setHideVerify] = useState(false);
  const [hideReset, setHideReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.message.includes("Redirect to signup")) {
        alert("Account doesn't exist, please create an account.");
        window.location.href = "/signup";
      } else if (data.message.includes("Redirect to Google login")) {
        alert("Please log in with Google.");
        window.location.href = "http://localhost:3000/auth/google";
      } else {
        setHideEmail(false);
        setHideVerify(true);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="login-form">
      <div className="login-info">
        <br />
        <h1>Welcome Again!!</h1>
        <p>OTP will be sent to your email</p>
        <br />
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Login illustration"
          className="login-image"
        />
      </div>
      {hideEmail && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Generate OTP"}
          </button>
        </form>
      )}
      {hideVerify && <VerifyOTP email={email} setHideVerify={setHideVerify} setHideReset={setHideReset} />}
      {hideReset && <ResetPassword email={email} />}
    </div>
  );
}

function VerifyOTP({ email, setHideVerify, setHideReset }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setHideVerify(false);
        setHideReset(true);
        alert("OTP Verified. Now set your new password.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
      </div>
    </form>
  );
}

function ResetPassword({ email }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });
      
      if (res.ok) {
        alert("Password reset successful! Redirecting to login...");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
      </div>
    </form>
  );
}

export default Forgot;
