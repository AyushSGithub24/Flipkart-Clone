import { useState } from "react";
import { Box, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Link } from "@mui/material";
import { LocalShipping, MenuBook } from "@mui/icons-material";

export function RegistrationForm({value}) {
  const {setStep,category,setCategory,mobile,setMobile,email,setEmail,gstin,setGstin}=value;
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)){
        alert("Email is not in correct format")
        setEmail("")
        setMobile("")
        setGstin("")
        return;
    }
   setStep(2)
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", px: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              fullWidth
              type="tel"
              placeholder="Enter Mobile Number *"
              variant="outlined"
              size="small"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Box>
          <TextField
            fullWidth
            type="email"
            placeholder="Email ID *"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            What are you looking to sell on Flipkart?
          </Typography>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShipping sx={{ mr: 1 }} />
                  All Categories
                </Box>
              }
            />
            <FormControlLabel
              value="books"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MenuBook sx={{ mr: 1 }} />
                  Only Books
                </Box>
              }
            />
          </RadioGroup>
          {category === "books" && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              (ISBN is mandatory)
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Enter GSTIN"
            variant="outlined"
            size="small"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            GSTIN is required to sell products on Flipkart. You can also share it in the final step.
          </Typography>
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
          Register & Continue
        </Button>
      </form>
    </Box>
  );
}
