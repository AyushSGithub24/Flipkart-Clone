import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import SignUp from "./Routes/SignUp";
import ErrorPage from "./Routes/ErrorPage";
import OAuthCallback from "./Routes/OAuthCallback";
import MyProfile from "./Routes/MyProfile"; 
import "./App.css";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ForgotPassword from "./Routes/forgotPassword";
import Seller from "./Routes/Seller";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/oauth" element={<OAuthCallback />} />
            <Route path="/forget" element={<ForgotPassword/>}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<MyProfile />} />
            </Route>
            <Route path="/seller" element={<Seller/>}  />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
