import React, { useState, useEffect, useRef } from 'react';
import './FD.css';
import profileicon from './profileicon.png';
import FMA from './FMA';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCR4Uv-kiMwAK6xqJ7k4g-P22TFL-CHoMU'; // Replace with your API key

const VehicaleRequired = () => {
  const [formData, setFormData] = useState({
    workType: '',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    address: '',
    lat: null,
    lng: null,
    requestedAmount: '',
    vehicleType: '',
    tractorType: '',
    harvesterType: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showFMA, setShowFMA] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}',
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
      address: 'Lat: ${event.latLng.lat()}, Lng: ${event.latLng.lng()}',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleMenuClick = (menu) => {
    if (menu === "My Activities") {
      setShowFMA(true);
    } else if (menu === "Dashboard") {
      setShowFMA(false);
      setSubmitted(false);
    }
  };

  return (
    <div className="farmer-dashboard-container">
      <nav className="navbar">
        <h1 className="app-name">AgriFarm</h1>
        <div className="nav-menu">
          <span className="menu-item" onClick={() => handleMenuClick("Dashboard")}>Home</span>
          <span className="menu-item" onClick={() => handleMenuClick("My Activities")}>My Activities</span>
          <span className="menu-item">Settings</span>
        </div>
        <div className="profile-icon">
          <Link to='./Profile'><img src={profileicon} alt='profile icon' height='40px' width='40px' /></Link>
        </div>
      </nav>

      <main className="dashboard-body">
        {showFMA ? (
          <FMA />
        ) : !submitted ? (
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="dashboard-title">Schedule work:</h2>

            <div className="form-group">
              <label>Work Type</label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Work Type</option>
                <option value="Corn Seeding">Corn Seeding</option>
                <option value="Plucking Cotton">Plucking Cotton</option>
                <option value="Rice Plantation">Rice Plantation</option>
                <option value="Weeding">Weeding</option>
                <option value="Packing Crops">Packing Crops</option>
                <option value="custom">Other (Specify Below)</option>
              </select>

              {formData.workType === "custom" && (
                <input
                  type="text"
                  name="customWorkType"
                  value={formData.customWorkType || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, workType: e.target.value })
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
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={{ width: '100%', height: '300px' }}
                    center={{ lat: formData.lat || 17.385044, lng: formData.lng || 78.486671 }}
                    zoom={12}
                    onClick={handleMapClick}
                  >
                    {formData.lat && formData.lng && <Marker position={{ lat: formData.lat, lng: formData.lng }} />}
                  </GoogleMap>
                </LoadScript>
              )}

              <input type="text" value={formData.address} readOnly className="address-display" />
            </div>

            <div className="form-group">
              <label>Vehicles:</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Drone">Drone</option>
              </select>

              {formData.vehicleType === "Tractor" && (
                <select
                  name="tractorType"
                  value={formData.tractorType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Tractor Type</option>
                  <option value="Rotavator">Rotavator</option>
                  <option value="Plowing">Plowing</option>
                  <option value="Seeding">Seeding</option>
                  <option value="Leveling">Leveling</option>
                </select>
              )}

              {formData.vehicleType === "Harvester" && (
                <select
                  name="harvesterType"
                  value={formData.harvesterType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Harvester Type</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Corn">Corn</option>
                  <option value="Sunflower">Sunflower</option>
                </select>
              )}
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
          <div>Labor Profiles will be displayed here.</div>
        )}
      </main>
    </div>
  );
};

export default VehicaleRequired;