import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./UserProfile.css";
import PersonalInfo from './PersonalInfo';
import ManageAddress from './ManageAddress'; // Assuming you have this component
import PreviousOrder from './PreviousOrder'; // Assuming you have this component
import { useAuth } from './../Contexts/AuthContext';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile"); // Default to "profile" tab
  const {user}=useAuth();
  function showName(){
    let name=user.userName.split(" ")[0]
    return name;
  }
  return (
    <div className="body">
      <aside className="sidebar">
        <div className="profile-header">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt="Profile"
            className="avatar"
          />
          <div>
            <p className="greeting">Hello,</p>
            <p className="username">{showName()}</p>
          </div>
        </div>

        <nav>
          <div className="nav-section">
            <Link
              to="#orders"
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <span>📦</span>
              MY ORDERS
            </Link>
          </div>

          <div className="nav-section">
            <Link
              to="#settings"
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <span>👤</span>
              ACCOUNT SETTINGS
            </Link>
            <div className="sub-nav">
              <Link
                to="#profile"
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </Link>
              <Link
                to="#addresses"
                className={activeTab === "addresses" ? "active" : ""}
                onClick={() => setActiveTab("addresses")}
              >
                Manage Addresses
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Conditional rendering based on active tab */}
      {activeTab === "profile" && <PersonalInfo />}
      {activeTab === "addresses" && <ManageAddress />}
      {activeTab === "orders" && <PreviousOrder />}
    </div>
  );
}
