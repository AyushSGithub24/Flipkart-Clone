import React, { useState } from "react";
import useFetch from "../Hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import DeleteAccountModal from "./DeleteAccountModal";

function PersonalInfo() {
  const url=import.meta.env.VITE_API_BASE_URL;
  const { data, loading, error } = useFetch(url+"/account");
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  // Populate userData when data is fetched
  React.useEffect(() => {
    if (data) setUserData(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userData) return <p>No data available.</p>;

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle gender selection
  const handleGenderChange = (e) => {
    setUserData({ ...userData, gender: e.target.value });
  };
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{7,15}$/; // Supports international format
    return phoneRegex.test(phone);
  }
  // Function to save updated user data
  const handleSave = async () => {
    try {
      if ("email" in userData && !isValidEmail(userData.email)) {
        alert("Invalid email id");
        return;
      }
      if ("phone" in userData && !isValidPhone(userData.phone)) {
        alert("Invalid Phone no");
        return;
      }
      const response = await fetch(url+"/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include token for authentication
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to update user information.");

      alert("User information updated successfully!");
      setEditing(false);
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(url+"/account/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        alert("Account deleted successfully");
        logout(); // Log out user after deletion
        navigate("/"); // Redirect to home page
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <main className="main-content">
        <div className="card">
          <div className="section-header">
            <h1 className="section-title">Personal Information</h1>
            {editing ? (
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="edit-button" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                readOnly={!editing}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Your Gender</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={userData.gender === "male"}
                  onChange={handleGenderChange}
                  disabled={!editing}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={userData.gender === "female"}
                  onChange={handleGenderChange}
                  disabled={!editing}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  value="others"
                  checked={userData.gender === "others"}
                  onChange={handleGenderChange}
                  disabled={!editing}
                />
                <label htmlFor="others">Other</label>
              </div>
            </div>
          </div>

          <div className="form-field">
            <div className="section-header">
              <label>Email Address</label>
            </div>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>

          <div className="form-field">
            <div className="section-header">
              <label>Mobile Number</label>
            </div>
            <input
              type="tel"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>

          <div className="faq-section">
            <h2 className="faq-title">FAQs</h2>
            <div className="faq-item">
              <h3>
                What happens when I update my email address (or mobile number)?
              </h3>
              <p>
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account-related communication on your updated
                email address (or mobile number).
              </p>
            </div>
          </div>

          <div>
            <button
              className="delete-button"
              onClick={() => setModalOpen(true)}
            >
              Delete Account
            </button>
          </div>
          <br />
          <DeleteAccountModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onDelete={handleDelete}
          />
          <br />
          <div>
            <img
              width="100%"
              height="auto"
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
              style={{ verticalAlign: "middle", filter: "invert(0)" }}
              alt="Profile Footer"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default PersonalInfo;
