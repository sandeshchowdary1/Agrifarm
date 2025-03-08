import React, { useState,useEffect, useRef  } from 'react';
import './LD.css';
import LMA from './LMA';
import profileicon from './profileicon.png';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';

const LD = () => {
  const [formData, setFormData] = useState({
    workType: '',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    age: '',
    address: '',
    lat: null,
    lng: null,
    amount: ''
  });
  const [isActivities, setIsActivities] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const mapRef = useRef(null);
  const handleInputChange = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   useEffect(() => {
      if (useCurrentLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData({
              ...formData,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
            });
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true }
        );
      }
    }, [useCurrentLocation]);
  
    const handleMapClick = (event) => {
      setFormData({
        ...formData,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        address: `Lat: ${event.latLng.lat()}, Lng: ${event.latLng.lng()}`
      });
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Show success popup

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleMenuClick = (menu) => {
    if (menu === 'My Activities') {
      setIsActivities(true);
    } else {
      setIsActivities(false);
    }
  };
// Define handleCheckboxChange function
const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  setFormData((prevData) => {
    const updatedWorkType = checked
      ? [...prevData.workType, value]
      : prevData.workType.filter((item) => item !== value);
    return { ...prevData, workType: updatedWorkType };
  });
};
  return (
    <>
      <div className="labor-dashboard-container">
        <nav className="navbar">
          <h1 className="app-name">AgriFarm</h1>

          {/* Navigation Menu Inside Navbar */}
          <div className="nav-menu">
            <span 
              className={`menu-item ${!isActivities ? 'active' : ''}`} 
              onClick={() => handleMenuClick('Dashboard')}
            >
              Dashboard
            </span>
            <span 
              className={`menu-item ${isActivities ? 'active' : ''}`} 
              onClick={() => handleMenuClick('My Activities')}
            >
              My Activities
            </span>
            <span className="menu-item">Vehicles</span>
          </div>

          <div className="profile-icon">
            <Link to='./profile'><img src={profileicon} alt="profile icon" height="40px" width="40px" /></Link>
          </div>
        </nav>

        <main className="dashboard-body">
          {!isActivities ? (
            <>
              <form className="form" onSubmit={handleSubmit}>
              
  



              <div className="form-group">
  <label>Work Type</label>
  <div className="radio-group">
    {[
      { label: "Corn Seeding", img: "/images/cornseeding.jpg", alt: "Corn Seeding Image" },
      { label: "Plucking Cotton", img: "/images/pluckingcotton", alt: "Plucking Cotton Work" },
      { label: "Rice Plantation", img: "/images/Riceplantation", alt: "Rice Plantation Work" },
      { label: "Weeding", img: "/images/weeding.jpg", alt: "Weeding Work" },
      { label: "Packing Crops", img: "", alt: "Packing Crops Work" },
    ].map((work) => (
      <label key={work.label} className="radio-label">
        <input
          type="radio"
          name="workType"
          value={work.label}
          checked={formData.workType === work.label}
          onChange={(e) => setFormData({ ...formData, workType: e.target.value, customWorkType: "" })}
        />
        <img src={work.img} alt={work.label} className="work-type-image" />
        <span>{work.label}</span>
      </label>
    ))}
  </div>

  {formData.workType === "Custom" && (
    <input
      type="text"
      name="customWorkType"
      value={formData.customWorkType || ""}
      onChange={(e) =>
        setFormData({ ...formData, customWorkType: e.target.value })
      }
      placeholder="Enter work type"
      required
    />
  )}
</div>
{/*
<div className="form-group">
  <label>Work Type</label>
  <div>
    <label>
      <input
        type="checkbox"
        value="Corn Seeding"
        checked={formData.workType.includes("Corn Seeding")}
        onChange={handleCheckboxChange}
      />
      Corn Seeding
    </label>
    <label>
      <input
        type="checkbox"
        value="Plucking Cotton"
        checked={formData.workType.includes("Plucking Cotton")}
        onChange={handleCheckboxChange}
      />
      Plucking Cotton
    </label>
    <label>
      <input
        type="checkbox"
        value="Rice Plantation"
        checked={formData.workType.includes("Rice Plantation")}
        onChange={handleCheckboxChange}
      />
      Rice Plantation
    </label>
    <label>
      <input
        type="checkbox"
        value="Weeding"
        checked={formData.workType.includes("Weeding")}
        onChange={handleCheckboxChange}
      />
      Harvesting
    </label>
    <label>
      <input
        type="checkbox"
        value="Packing Crops"
        checked={formData.workType.includes("Packing Crops")}
        onChange={handleCheckboxChange}
      />
      Packing Crops
    </label>
    <label>
      <input
        type="checkbox"
        value="custom"
        checked={formData.workType.includes("custom")}
        onChange={handleCheckboxChange}
      />
      Other (Specify Below)
    </label>

    {formData.workType.includes("custom") && (
      <input
        type="text"
        name="customWorkType"
        value={formData.customWorkType || ""}
        onChange={(e) =>
          setFormData({ ...formData, customWorkType: e.target.value })
        }
        placeholder="Enter work type"
        required
      />
    )}
  </div>
</div>

*/}





                <div className="form-group">
                  <label>Date (From - To)</label>
                  <div className="date-range">
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Time (From - To)</label>
                  <div className="time-range">
                    <input
                      type="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="time"
                      name="timeTo"
                      value={formData.timeTo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter Age"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    required
                  ></textarea>
                </div>
<div className="form-group">
              <label>Address:</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="addressOption"
                    value="current"
                    checked={useCurrentLocation}
                    onChange={() => setUseCurrentLocation(true)}
                  />
                  Use Current Location
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="addressOption"
                    value="manual"
                    checked={!useCurrentLocation}
                    onChange={() => setUseCurrentLocation(false)}
                  />
                  Select on Map
                </label>
              </div>

              {!useCurrentLocation && (
                <GoogleMap
                  ref={mapRef}
                  mapContainerStyle={{ width: '100%', height: '300px' }}
                  center={{ lat: formData.lat || 17.385044, lng: formData.lng || 78.486671 }}
                  zoom={12}
                  onClick={handleMapClick}
                >
                  {formData.lat && formData.lng && <Marker position={{ lat: formData.lat, lng: formData.lng }} />}
                </GoogleMap>
              )}

              <input type="text" value={formData.address} readOnly className="address-display" />
            </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <button type="submit" className="submit-button">Submit</button>
              </form>
            </>
          ) : (
            <LMA />
          )}
        </main>

        {/* Success Popup */}
        {showPopup && (
          <div className="popup">
            <p>Submitted Successfully!</p>
          </div>
        )}
      </div>

      {/* Popup Styling */}
      <style>
        {`
          .popup {
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default LD;
