import { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function CreatePassword({value}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setStep,category,setCategory,mobile,setMobile,email,setEmail,gstin,setGstin}=value;
  const [errors, setErrors] = useState({}); 
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const formData = { mobile, email, category, gstin,password };
    try {
      const response = await fetch("http://localhost:3000/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/seller/login")
        alert("Register successfully!");
      } else {
        console.log("Registration failed:", data);
        if(data.message=="Email or Number already in use"){
            navigate("/seller")
            alert("Email or Number already in use")
        }
        setError(data.message || "Invalid email or password");
        setErrors(data.errors || {});
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", px: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="password"
            placeholder="Enter New Password *"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="password"
            placeholder="Confirm New Password *"
            variant="outlined"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          By continuing, I agree to Flipkart's{" "}
          <Link href="#" color="primary">
            Terms of Use
          </Link>{" "}
          &{" "}
          <Link href="#" color="primary">
            Privacy Policy
          </Link>
        </Typography>

        <Button type="submit" variant="contained" fullWidth>
          Set Password
        </Button>
      </form>
    </Box>
  );
}
