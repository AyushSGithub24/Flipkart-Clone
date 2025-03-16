import React, { useState } from "react";
import { Bell, Settings, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSellerAuth } from "../../Contexts/SellerAuthContext";

const Header = () => {
  const { logout, user, isLoggedIn } = useSellerAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const showName = () => user?.userName || "Seller";

  return (
    <header className="fixed top-0 w-full bg-white shadow-md p-4 z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/seller/dashboard">
          <img
            src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
            alt="Flipkart Seller Hub"
            className="h-8"
          />
        </Link>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <Bell size={20} />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <Settings size={20} />
          </button>

          {/* Profile Section */}
          {isLoggedIn && (
            <div className="relative">
              {/* Profile Button */}
              <div
                className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Seller"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="ml-2 hidden md:block font-medium">{showName()}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div
                  className="absolute top-12 right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <ul className="text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setShowProfileMenu(false);
                        // navigate("/seller/account");
                      }}
                    >
                      My Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
