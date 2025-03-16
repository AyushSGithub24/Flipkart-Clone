import React, { useState, useEffect, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../Contexts/AuthContext";
import { InputBase, Box,styled,Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function Header() {
  const { isLoggedIn, setIsLoggedIn, user, logout, accessToken } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const [username, setUserName] = useState("Profile");
  const handleLoginClick = () => {
    if (isLoggedIn) {
      setShowProfileMenu((prev) => !prev); // Toggle the dropdown menu
      showName();
    } else {
      navigate("/login"); // Redirect to login page
    }
  };
  const Component = styled(Link)`
  margin-left: 12%;
  color: #FFFFFF;
  text-decoration: none;
      position: relative;
    top: 3px;
  
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`

const PlusImage = styled('img')({
  width: 10,
  height: 10,
  marginLeft: 4
})
  function showName() {
    let name = user.userName.split(" ")[0];
    return name;
  }
  const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
  const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

  // Close profile dropdown when clicking outside

  return (
    <>
      <header className="header">
        <div className="contain">
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "0 0 0 30px",
              padding: 0,
            }}
          >
            <Component to='/'>
                    <img src={logoURL} style={{ width: 70 }} />
                    <Box component="span" style={{ display: 'flex' }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{color:'#FFE500'}}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} />
                    </Box>
                </Component>

            {/* Search Bar */}
            <div
              style={{
                background: "white",
                width: "65%",
                marginLeft: "20px",
                padding: "0px",
                display: "flex",
              }}
            >
              <InputBase
                placeholder="Search for products, brands and more"
                sx={{ width: "100%", padding: "0 0 0 10px" }}
              />
              <Box sx={{ color: "#2773E8", padding: "5px" }}>
                <SearchIcon />
              </Box>
            </div>
          </div>
          {/* Navigation Buttons */}
          <nav className="nav-buttons">
            {/* Profile Section */}
            <div
              className="nav-item"
              onClick={handleLoginClick}
              onMouseEnter={isLoggedIn ? () => setShowProfileMenu(true) : null}
              onMouseLeave={isLoggedIn ? () => setShowProfileMenu(false) : null}
            >
              <button className="nav-button">
                {isLoggedIn ? showName() : "Login"}
              </button>
              {isLoggedIn && showProfileMenu && (
                <div className="dropdown-menu">
                  <ul>
                    <li
                      onClick={() => {
                        navigate("/account");
                      }}
                    >
                      My Profile
                    </li>
                    <li onClick={()=>{logout()}}>Logout</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Become a Seller */}
            <div className="nav-item">
              <p
                style={{
                  background: "none",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  "font-size": "16px",
                  fontWeight: 600,
                  width: "120px",
                }}
                onClick={()=>{
                  navigate("/seller")
                }}
              >
                Become a Seller
              </p>
            </div>

            {/* More Section */}
            <div
              className="nav-item"
              onMouseEnter={() => setShowMoreMenu(true)}
              onMouseLeave={() => setShowMoreMenu(false)}
            >
              <button className="nav-button">More</button>
              {showMoreMenu && (
                <div className="dropdown-menu">
                  <ul>
                    <li>Notification Preference</li>
                    <li>24x7 Customer Care</li>
                    <li>Advertise</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cart Section */}
            <div className="nav-item cart">
              <svg
                className="cart-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                  fill="#fff"
                ></path>
              </svg>
              <button className="nav-button">Cart</button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
