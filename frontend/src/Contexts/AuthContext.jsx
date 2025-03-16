import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";  // Corrected import

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken); // Initialize with a boolean
  
  // Token expiration check
  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log(refreshToken);
    try {
      const response = await fetch("http://localhost:3000/refresh-token", {
        method: "POST",
        credentials: "include", // Send cookies for refresh token
        headers: {
          "Content-Type": "application/json",
          ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }) // Include token if available
        },  
      });
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        setUser(jwtDecode(data.accessToken));
      } else {
        console.error("Failed to refresh token");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    setUser(jwtDecode(token));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }) // Include token if available
        }
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setAccessToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
  };

  const value = {
    accessToken,
    setAccessToken,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    user,
  };

  useEffect(() => {
    if (accessToken && isLoggedIn) {
       refreshAccessToken();
      const interval = setInterval(() => {
        if (isTokenExpired(accessToken)) {
          refreshAccessToken();
        }
      }, 1 * 60 * 1000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [accessToken, isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !isLoggedIn) {
      setIsLoggedIn(true); // Update state to keep user logged in if token exists
    }
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
