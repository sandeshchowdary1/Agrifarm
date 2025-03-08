import React from "react";
import "./VehicleOptions.css";

const VehicleOptions = ({ setActiveVehicleView }) => {
  return (
    <div className="vehicle-options-container-v">
      <h2>Vehicle Options:</h2>
      <div className="form-group-v">
        <button type="button" onClick={() => setActiveVehicleView("post")}>Post Vehicle</button>
        <button type="button" onClick={() => setActiveVehicleView("request")}>Request Vehicle</button>
        <button type="button" onClick={() => setActiveVehicleView("activities")}>My Activities</button>
        
      </div>
    </div>
  );
};

export default VehicleOptions;