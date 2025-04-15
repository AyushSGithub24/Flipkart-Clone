import { useState,useEffect } from "react";
import "./AddressManager.css";
import useFetch from './../Hooks/use-fetch';
import { useAuth } from "../Contexts/AuthContext";
function ManageAddress() {
  const url=import.meta.env.VITE_API_BASE_URL;
  const { data, loading, error } = useFetch(url+"/account/address");
  const [addresses, setAddresses] = useState([]||data);
  useEffect(() => {
    if (data) setAddresses(data);
  }, [data]);
  const {accessToken}=useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    type: "home",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [hide,sethide]=useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedAddresses;
    
    if (isEditing) {
      updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = formData;
    } else {
      updatedAddresses = [...addresses, formData];
    }

    try {
      const response=await fetch(url+"/account/address",{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body:JSON.stringify({"Address":updatedAddresses})
      })
      if(response.ok){
        alert("Address updated succesfully")
      }
      setAddresses(updatedAddresses);
      setIsEditing(false);
      setEditIndex(null);
      setFormData({
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        altPhone: "",
        type: "home",
      });
      sethide(true)
    } catch (error) {
      console.error("Failed to update addresses:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {  
    // Create the updated addresses array
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    // Update state
    setAddresses(updatedAddresses);  
    try {
      const response = await fetch(url+"/account/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ "Address": updatedAddresses }) // Use updatedAddresses, not addresses
      });
  
      if (response.ok) {
        alert("Address updated successfully");
      } else {
        console.error("Failed to update addresses:", await response.text());
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };
  
  if(loading){
    return <div>loading ...</div>
  }
  return (
    <div className="address-manager">
      <h1 style={{  fontSize: "20px",color:"#333",}}>Manage Addresses</h1>
      <div className="address-form-container">
        <h2 onClick={()=>{
          sethide(v=>!v)
        }} style={{position:"relative",top:"20px",fontSize:"15px",
          color:" #1a73e8",paddingLeft:'50px'}}>{isEditing ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}</h2>
        {!hide ?<form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Locality"
              value={formData.locality}
              onChange={(e) =>
                setFormData({ ...formData, locality: e.target.value })
              }
            
            />
          </div>

          <textarea
            placeholder="Address (Area and Street)"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <div className="form-row" style={{marginBottom:"10px"}}>
            <input
              type="text"
              placeholder="City/District/Town"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
            <select
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Landmark (Optional)"
              value={formData.landmark}
              onChange={(e) =>
                setFormData({ ...formData, landmark: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Alternate Phone (Optional)"
              value={formData.altPhone}
              onChange={(e) =>
                setFormData({ ...formData, altPhone: e.target.value })
              }
            />
          </div>

          <div className="address-type">
            <p>Address Type</p>
            <div className="radio-group">
              <label>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    checked={formData.type === "home"}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  />
                  <span>Home</span>
                </div>
              </label>
              <label>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="type"
                    value="work"
                    checked={formData.type === "work"}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  />
                  <span>Work</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {isEditing ? "UPDATE" : "SAVE"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              CANCEL
            </button>
          </div>
        </form>:<></>
        }
      </div>

      <div className="saved-addresses">
        {addresses.map((addr, index) => (
          <div key={index} className="address-card">
            <div className="address-type-tag">{addr.type}</div>
            <div className="address-details">
              <p className="name">{addr.name}</p>
              <p className="phone">{addr.phone}</p>
              <p className="address">{addr.address}</p>
            </div>
            <button
              className="more-options"
              onClick={() =>
                setShowDropdown(showDropdown === index ? null : index)
              }
            >
              ⋮
              {showDropdown === index && (
                <div className="options-dropdown">
                  <button onClick={() => {sethide(v=>false)
                  handleEdit(index)}}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAddress;
