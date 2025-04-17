// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate,Link } from "react-router-dom";
// import "./Header.css";
// import { useAuth } from "../Contexts/AuthContext";
// import { InputBase, Box,styled,Typography } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// function Header() {
//   const { isLoggedIn, setIsLoggedIn, user, logout, accessToken } = useAuth();
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showMoreMenu, setShowMoreMenu] = useState(false);
//   const navigate = useNavigate();
//   const profileMenuRef = useRef(null);
//   const [username, setUserName] = useState("Profile");
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleLoginClick = () => {
//     if (isLoggedIn) {
//       setShowProfileMenu((prev) => !prev); // Toggle the dropdown menu
//       showName();
//     } else {
//       navigate("/login"); // Redirect to login page
//     }
//   };
//   const Component = styled(Link)`
//   margin-left: 12%;
//   color: #FFFFFF;
//   text-decoration: none;
//       position: relative;
//     top: 3px;
  
// `;
// const SubHeading = styled(Typography)`
//   font-size: 10px;
//   font-style: italic;
// `;
// const PlusImage = styled('img')({
//   width: 10,
//   height: 10,
//   marginLeft: 4
// });

//   function showName() {
//     let name = user.userName.split(" ")[0];
//     return name;
//   }
//   const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
//   const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

//   // Close profile dropdown when clicking outside
//   const url=import.meta.env.VITE_API_BASE_URL;
//   const [data, setData] = useState([]);
//   // const [cache,setCache]=useState({})
//   const [showData,setShowData]=useState(false)

//   useEffect(()=>{
//     const timer=setTimeout(()=>{
//       fetchData()
//     },500)
//     return ()=>clearTimeout(timer)

//   },[searchQuery])

//   const fetchData=async () => {
//     if (!searchQuery.trim()) return;
//     // if(cache[searchQuery]){
//     //   console.log("return cache"); 
//     //   setData(cache[searchQuery])
//     //   return
//     // }
//       try {
//         const response=await fetch(`${url}/product/search?search=${searchQuery}`)
//         const d=await response.json()
//         setData(d.products);
//         // setCache((prev)=>({...prev,[searchQuery]:data}))
//         console.log(data);
//         // console.log(cache);
//       } catch (error) {
//         console.log("Error searching "+error);
//       }
//   }


//   return (
//     <>
//       <header className="header">
//         <div className="contain">
//           {/* Logo Section */}
//           <div
//             style={{
//               display: "flex",
//               width: "100%",
//               margin: "0 0 0 30px",
//               padding: 0,
//             }}
//           >
//             <Component to='/'>
//                     <img src={logoURL} style={{ width: 70 }} />
//                     <Box component="span" style={{ display: 'flex' }}>
//                         <SubHeading>Explore&nbsp;
//                             <Box component="span" style={{color:'#FFE500'}}>
//                                 Plus
//                             </Box>
//                         </SubHeading>
//                         <PlusImage src={subURL} />
//                     </Box>
//                 </Component>

//             {/* Search Bar */}
//             <div
//               style={{
//                 background: "white",
//                 width: "65%",
//                 marginLeft: "20px",
//                 padding: "0px",
//                 display: "flex",
//               }}
//             >
//               <InputBase
//                 placeholder="Search for products, brands and more"
//                 sx={{ width: "100%", padding: "0 0 0 10px" }}
//                 value={searchQuery}
//                 onChange={(e) =>setSearchQuery(e.target.value)}
//               />
//               <Box sx={{ color: "#2773E8", padding: "5px" }}>
//                 <SearchIcon />
//               </Box>
//             </div>
//             {data && data.map((value,idx)=><div key={idx}>{value?.name}</div>)}
//           </div>
//           {/* Navigation Buttons */}
//           <nav className="nav-buttons">
//             {/* Profile Section */}
//             <div
//               className="nav-item"
//               onClick={handleLoginClick}
//               onMouseEnter={isLoggedIn ? () => setShowProfileMenu(true) : null}
//               onMouseLeave={isLoggedIn ? () => setShowProfileMenu(false) : null}
//             >
//               <button className="nav-button">
//                 {isLoggedIn ? showName() : "Login"}
//               </button>
//               {isLoggedIn && showProfileMenu && (
//                 <div className="dropdown-menu">
//                   <ul>
//                     <li
//                       onClick={() => {
//                         navigate("/account");
//                       }}
//                     >
//                       My Profile
//                     </li>
//                     <li onClick={()=>{logout()}}>Logout</li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Become a Seller */}
//             <div className="nav-item">
//               <p
//                 style={{
//                   background: "none",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                   "font-size": "16px",
//                   fontWeight: 600,
//                   width: "120px",
//                 }}
//                 onClick={()=>{
//                   navigate("/seller")
//                 }}
//               >
//                 Become a Seller
//               </p>
//             </div>

//             {/* More Section */}
//             <div
//               className="nav-item"
//               onMouseEnter={() => setShowMoreMenu(true)}
//               onMouseLeave={() => setShowMoreMenu(false)}
//             >
//               <button className="nav-button">More</button>
//               {showMoreMenu && (
//                 <div className="dropdown-menu">
//                   <ul>
//                     <li>Notification Preference</li>
//                     <li>24x7 Customer Care</li>
//                     <li>Advertise</li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Cart Section */}
//             <div className="nav-item cart">
//               <svg
//                 className="cart-icon"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
//                   fill="#fff"
//                 ></path>
//               </svg>
//               <button className="nav-button">Cart</button>
//             </div>
//           </nav>
//         </div>
//       </header>
//     </>
//   );
// }

// export default Header;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import {
  InputBase,
  Box,
  styled,
  Typography,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";

function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_BASE_URL;

  const profileName = () => user?.userName?.split(" ")[0] || "Profile";

  // Search Bar debounce + fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`${url}/product/search?search=${searchQuery}`);
      const d = await res.json();
      setData(d.products);
      setShowData(true);
    } catch (err) {
      console.error("Error searching:", err);
    }
  };

  const handleSearchClickAway = () => {
    setShowData(false);
  };

  // Styled components
  const Component = styled(Link)`
    margin-left: 12%;
    color: #ffffff;
    text-decoration: none;
    position: relative;
    top: 3px;
  `;
  const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
  `;
  const PlusImage = styled("img")({
    width: 10,
    height: 10,
    marginLeft: 4,
  });

  return (
    <header className="header">
      <div className="contain">
        {/* Logo */}
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "0 0 0 30px",
            padding: 0,
          }}
        >
          <Component to="/">
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              style={{ width: 70 }}
              alt="logo"
            />
            <Box component="span" sx={{ display: "flex" }}>
              <SubHeading>
                Explore&nbsp;
                <Box component="span" sx={{ color: "#FFE500" }}>
                  Plus
                </Box>
              </SubHeading>
              <PlusImage src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" />
            </Box>
          </Component>

          {/* Search Bar */}
          <ClickAwayListener onClickAway={handleSearchClickAway}>
            <Box
              sx={{
                background: "white",
                width: "60%",
                ml: 3,
                boxShadow: 2,
                display: "flex",
                alignItems: "center",
                px: 2,
                position: "relative",
              }}
            >
              <InputBase
                placeholder="Search for products, brands and more"
                sx={{ flex: 1 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon sx={{ color: "#2773E8" }} onClick={()=>{
                
              }} />

              {/* Search Suggestions Dropdown */}
              {showData && data?.length > 0 && (
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {data.map((item, idx) => (
                    <Box
                      key={idx}
                      px={2}
                      py={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f1f1f1" },
                      }}
                      onClick={() => {
                        navigate("/productDetail", { state: { products: item } });
                        setShowData(false);
                      }}
                    >
                      {item.name}
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
        </div>

        {/* Navigation */}
        <nav className="nav-buttons">
          {/* Profile */}
          <div
            className="nav-item"
            onClick={() =>
              isLoggedIn ? setShowProfileMenu((prev) => !prev) : navigate("/login")
            }
            onMouseEnter={isLoggedIn ? () => setShowProfileMenu(true) : null}
            onMouseLeave={isLoggedIn ? () => setShowProfileMenu(false) : null}
          >
            <button className="nav-button">
              {isLoggedIn ? profileName() : "Login"}
            </button>
            {isLoggedIn && showProfileMenu && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => navigate("/account")}>My Profile</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
            )}
          </div>

          {/* Seller */}
          <div className="nav-item">
            <p
              style={{
                background: "none",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 600,
                width: "120px",
              }}
              onClick={() => navigate("/seller")}
            >
              Become a Seller
            </p>
          </div>

          {/* More */}
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

          {/* Cart */}
          <div className="nav-item cart" onClick={()=>{isLoggedIn?navigate("/cart"):navigate("/login")}} >
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
  );
}

export default Header;

