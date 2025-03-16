import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const SellerAuthContext = React.createContext();

export function useSellerAuth() {
  return useContext(SellerAuthContext);
}

export function SellerAuthProvider({ children }) {
  const [SellerAccessToken, setSellerAccessToken] = useState(localStorage.getItem("SellerAccessToken") || null); // Corrected name
  const [user, setUser] = useState(SellerAccessToken ? jwtDecode(SellerAccessToken) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!SellerAccessToken);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  const login = (token) => {
    setSellerAccessToken(token); // Corrected name
    localStorage.setItem("SellerAccessToken", token);
    setUser(jwtDecode(token));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("SellerRefreshToken");
    setIsLoading(true); // Set loading to true during logout
    try {
      await fetch("http://localhost:3000/seller/logout", {
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}` // Include token if available
        },  
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setSellerAccessToken(null); // Corrected name
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("SellerAccessToken");
    localStorage.removeItem("SellerRefreshToken");
    setIsLoading(false); // Set loading to false after logout is complete
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("SellerRefreshToken");
    setIsLoading(true); // Set loading to true during refresh
    try {
      const response = await fetch("http://localhost:3000/seller/refresh-token", { // Corrected URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}` // Include token if available
        }, 
      });

      if (response.ok) {
        const data = await response.json();
        setSellerAccessToken(data.accessToken); // Corrected name
        localStorage.setItem("SellerAccessToken", data.accessToken); // Added missing line
        setUser(jwtDecode(data.accessToken));
      } else {
        console.error("Failed to refresh token");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
    setIsLoading(false); // Set loading to false after refresh is complete
  };

  useEffect(() => {
    if (SellerAccessToken && isLoggedIn) {
      refreshAccessToken();
      const interval = setInterval(() => {
        if (isTokenExpired(SellerAccessToken)) {
          refreshAccessToken();
        }
      }, 1 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [SellerAccessToken, isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("SellerAccessToken");
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      setIsLoading(false); // Set loading to false after initial check
    } else {
      setIsLoading(false); // Set loading to false if no token is found
    }
  }, [isLoggedIn]);

  const value = {
    SellerAccessToken,
    setSellerAccessToken, // Corrected name
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    user,
    isLoading, // Added loading state to value
  };

  return <SellerAuthContext.Provider value={value}>{children}</SellerAuthContext.Provider>;
}