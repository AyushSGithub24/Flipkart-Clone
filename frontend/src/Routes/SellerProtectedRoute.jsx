import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSellerAuth } from "../Contexts/SellerAuthContext";

function SellerProtectedRoute() {
  const { SellerAccessToken, user,logout } = useSellerAuth();

  if (!SellerAccessToken || !user) {
    return <Navigate to="/seller" replace />;
  }


  return <Outlet />; // Allows rendering of nested routes
}

export default SellerProtectedRoute;
