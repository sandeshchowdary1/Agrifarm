import React, { useState, useEffect, useRef } from 'react';
import './FD.css';
import profileicon from './profileicon.png';
import FMA from './FMA';
import VehicleOptions from './VehicleOptions';
import RequestVehicle from './RequestVehicle';  
import PostVehicle from './PostVehicle';  
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';

const FD = () => {
  const [formData, setFormData] = useState({
    workType: '',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    address: '',
    lat: null,
    lng: null,
    requestedAmount: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showFMA, setShowFMA] = useState(false);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const mapRef = useRef(null);
  const [activeVehicleView, setActiveVehicleView] = useState("options");
  const [laborProfiles, setLaborProfiles] = useState([]);
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
  const handleWorkTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      workType: checked
        ? [...prevData.workType, value] // Add selected work type
        : prevData.workType.filter((type) => type !== value), // Remove unselected work type
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    // Static labor profiles added on form submission
    setLaborProfiles([
      {
        id: 1,
        profilePhoto: "https://via.placeholder.com/100",
        name: "Ravi Kumar",
        mobile_number: "9876543210",
        workType: formData.workType, // Use selected work type
        address: formData.address,   // Use selected address
        gender: "Male",
        age: 35,
        rating: 4.5,
        requestSent: false
      },
      {
        id: 2,
        profilePhoto: "https://via.placeholder.com/100",
        name: "Sunitha Reddy",
        mobile_number: "9876543211",
        workType: formData.workType,
        address: formData.address,
        gender: "Female",
        age: 28,
        rating: 4.8,
        requestSent: false
      }
    ]);
  };
  

  const handleMenuClick = (menu) => {
    if (menu === "My Activities") {
      setShowFMA(true);
      setShowVehicleOptions(false);
    } else if (menu === "Dashboard") {
      setShowFMA(false);
      setShowVehicleOptions(false);
      setSubmitted(false);
    } else if (menu === "Vehicle") {
      setShowVehicleOptions(true);
      setShowFMA(false);
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
    <div className="farmer-dashboard-container">
      <nav className="navbar">
        <h1 className="app-name">AgriFarm</h1>
        <div className="nav-menu">
          <span className="menu-item" onClick={() => handleMenuClick("Dashboard")}>Home</span>
          <span className="menu-item" onClick={() => handleMenuClick("My Activities")}>My Activities</span>
          <span className="menu-item" onClick={() => handleMenuClick("Vehicle")}>Vehicle</span>
        </div>
        <div className="profile-icon">
          <Link to='./profile'><img src={profileicon} alt='profile icon' height='40px' width='40px' /></Link>
        </div>
      </nav>  

      <main className="dashboard-body">
        {showFMA ? (
          <FMA />
        ): showVehicleOptions ? (
          <>
            {activeVehicleView === "request" ? (
              <RequestVehicle setActiveVehicleView={setActiveVehicleView} />
            ) : activeVehicleView === "post" ? (
              <PostVehicle setActiveVehicleView={setActiveVehicleView} />
            ) : (
              <VehicleOptions setActiveVehicleView={setActiveVehicleView} />
            )}
          </>
        ) : !submitted ? (
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="dashboard-title">Schedule work:</h2>

            <div className="form-group">
  <label>Work Type</label>
  <div className="radio-group">
    {[
      { label: "Corn Seeding", img: "C:\Users\palle\OneDrive\Documents\AgriFarm\AgriFarm raect code\AgriFarm 15-02-25\agrifarm\src\components\images\cornseeding.jpg", alt: "Corn Seeding Image" },
      { label: "Plucking Cotton", img: "./images/pluckingcotton", alt: "Plucking Cotton Work" },
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




            <div className="form-group">
              <label>Date (From - To)</label>
              <div className="date-range">
                <input type="date" name="dateFrom" value={formData.dateFrom} onChange={handleInputChange} required />
                <input type="date" name="dateTo" value={formData.dateTo} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Time (From - To)</label>
              <div className="time-range">
                <input type="time" name="timeFrom" value={formData.timeFrom} onChange={handleInputChange} required />
                <input type="time" name="timeTo" value={formData.timeTo} onChange={handleInputChange} required />
              </div>
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
              <label>Emergency</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input type="radio" name="requestType" value="Emergency" checked={formData.requestType === "Emergency"} onChange={handleInputChange} required />
                  Yes
                </label>
                <label className="radio-label">
                  <input type="radio" name="requestType" value="Not an Emergency" checked={formData.requestType === "Not an Emergency"} onChange={handleInputChange} required />
                  No
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">Submit Request</button>
          </form>
        ) : (
          <div className="labor-profiles">
          <h2 className="dashboard-title">Available Labor Profiles</h2>
          <div className="profiles-container">
            {laborProfiles.length > 0 ? (
              laborProfiles.map((labor) => (
                <div className="profile-card" key={labor.id}>
                  <img src={labor.profilePhoto} alt={`${labor.name} profile`} className="profile-photo" />
                  <h3>{labor.name}</h3>
                  <p><strong>Mobile Number:</strong> {labor.mobile_number}</p>
                  <p><strong>Work Type:</strong> {labor.workType}</p>
                  <p><strong>Address:</strong> {labor.address}</p>
                  <p><strong>Gender:</strong> {labor.gender}</p>
                  <p><strong>Age:</strong> {labor.age}</p>
                  <p><strong>Rating:</strong> {labor.rating} ⭐</p>
                  
                  <button
                    className={`send-request-button ${labor.requestSent ? 'request-sent' : ''}`}
                    onClick={(e) => {
                      e.target.textContent = "Request Sent";
                      e.target.classList.add("request-sent");
                      e.target.disabled = true;
                    }}
                  >
                    Send Request
                  </button>
                </div>
              ))
            ) : (
              <p>No labor profiles available.</p>
            )}
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default FD;
