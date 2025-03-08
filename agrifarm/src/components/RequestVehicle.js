import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyCR4Uv-kiMwAK6xqJ7k4g-P22TFL-CHoMU"; 

const RequestVehicle = ({ setActiveVehicleView }) => {
  const [formData, setFormData] = useState({
    workType: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    address: "",
    lat: null,
    lng: null,
    vehicleType: "",
    tractorType: "",
    harvesterType: "",
    requestType: "",
  });
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
            address: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`,
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
      address: `Lat: ${event.latLng.lat()}, Lng: ${event.latLng.lng()}`,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle Request Submitted", formData);
  };

  return (
    <div className="request-vehicle-container">
      <h2 className="dashboard-title">Request Vehicle</h2>
      <form className="form" onSubmit={handleSubmit}>

      <div className="form-group">
          <label>Vehicle Type</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} required>
            <option value="">Select Vehicle Type</option>
            <option value="Tractor">Tractor</option>
            <option value="Harvester">Harvester</option>
            <option value="Drone">Drone</option>
          </select>
        </div>

        <div className="form-group">
          <label>Work Type</label>
          <select name="workType" value={formData.workType} onChange={handleInputChange} required>
            <option value="">Select Work Type</option>
            <option value="Corn Seeding">plowing</option>
            <option value="Plucking Cotton">Rotavator</option>
            <option value="Rice Plantation">Leveling</option>
            <option value="Weeding">Seeding</option>
            <option value="Packing Crops">Paddy</option>
            <option value="Packing Crops">wheat</option>
            <option value="custom">Other (Specify Below)</option>
          </select>

          {formData.workType === "custom" && (
            <input type="text" name="customWorkType" placeholder="Enter work type" onChange={handleInputChange} required />
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
            <label>
              <input type="radio" name="addressOption" checked={useCurrentLocation} onChange={() => setUseCurrentLocation(true)} />
              Use Current Location
            </label>
            <label>
              <input type="radio" name="addressOption" checked={!useCurrentLocation} onChange={() => setUseCurrentLocation(false)} />
              Select on Map
            </label>
          </div>

          {!useCurrentLocation && (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap ref={mapRef} mapContainerStyle={{ width: "100%", height: "300px" }} center={{ lat: formData.lat || 17.385044, lng: formData.lng || 78.486671 }} zoom={12} onClick={handleMapClick}>
                {formData.lat && formData.lng && <Marker position={{ lat: formData.lat, lng: formData.lng }} />}
              </GoogleMap>
            </LoadScript>
          )}

          <input type="text" value={formData.address} readOnly className="address-display" />
        </div>

        

        <div className="form-group">
          <label>Emergency</label>
          <div className="radio-options">
            <label>
              <input type="radio" name="requestType" value="Emergency" checked={formData.requestType === "Emergency"} onChange={handleInputChange} required />
              Yes
            </label>
            <label>
              <input type="radio" name="requestType" value="Not an Emergency" checked={formData.requestType === "Not an Emergency"} onChange={handleInputChange} required />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Request</button>
        <button type="button" className="back-button" onClick={() => setActiveVehicleView(null)}>Back</button>
      </form>
    </div>
  );
};

export default RequestVehicle;