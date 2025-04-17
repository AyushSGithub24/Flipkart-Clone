import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Link,
  ThemeProvider,
  createTheme,
  Divider,
} from "@mui/material";
import { useSellerAuth } from "../../Contexts/SellerAuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "12px",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default function LoginDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, setIsLoggedIn } = useSellerAuth();
  const navigate = useNavigate(); 
  const url=import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", email, password);
    try {
      const response = await fetch(url+"/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        if(data.refreshToken){
          localStorage.setItem("SellerRefreshToken", data.refreshToken);
        }
        login(data.accessToken)
        setIsLoggedIn(true)
        navigate("/seller/dashboard");
      } else {
        const data = await response.json();
        console.log(data);
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please login to continue
          </Typography>
        </DialogTitle>
        <Divider sx={{ mx: 3 }} />
        <DialogContent sx={{ p: 3, overflow: "hidden" }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 1, mb: 2, borderRadius: "8px" }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              <Link href="#" underline="hover">
                Forgot Password?
              </Link>
            </Typography>
            <br />
            {error && <p className="error-message" style={{textAlign:"center"}}>{error}</p>}
            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link href="/seller/register" underline="hover">
                  Register
                </Link>
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              display="block"
              mt={2}
            >
              By continuing, you agree to our{" "}
              <Link href="/terms" underline="hover">
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link href="/privacy" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 3, justifyContent: "center" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
