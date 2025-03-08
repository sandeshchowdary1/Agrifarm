// MyActivities.js
import React, { useState } from 'react';
import './LMA.css';

const LMA = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const farmerProfiles = [
    {
      name: 'harsha',
      workType: 'Planting',
      address: 'Farm Road, Area 12',
      dateFrom: '2025-01-10',
      dateTo: '2025-01-15',
      timeFrom: '08:00',
      timeTo: '16:00',
      mobile_no:'1234567890',
      paymentMethods: ['upi or cash'],
      rating: 4.5,
    },
    {
      name: 'Raju',
      workType: 'Harvesting',
      address: 'Greenfield, Sector 9',
      dateFrom: '2025-02-01',
      dateTo: '2025-02-05',
      timeFrom: '07:30',
      timeTo: '15:30',
      mobile_no:'1234567890',
      paymentMethods: ['cash'],
      rating: 4.8,
    },
  ];

  const handleAcceptRequest = (name) => {
    setAcceptedRequests((prevRequests) => [...prevRequests, name]);
  };

  return (
    <div className="farmer-profile-cards">
      {farmerProfiles.map((profile, index) => (
        <div className="farmer-card" key={index}>
          <div className="farmer-photo">👩‍🌾</div>
          <div className="farmer-details">
            <h3 className="farmer-name">{profile.name}</h3>
            <div className="work-type">
              <span className="highlighted">{profile.workType}</span>
            </div>
            <div className="address">
              <span>📍 {profile.address}</span>
            </div>
            <div className="date-time">
              <span>{profile.dateFrom} - {profile.dateTo}</span><br/>
              <span>{profile.timeFrom} - {profile.timeTo}</span>
            </div>
            <div className="date-time">
              <span>mobile_no:{profile.mobile_no}</span></div>
            <div className="payment-methods">
              {profile.paymentMethods.map((method, i) => (
                <span key={i} className="payment-method">
                  {method}
                </span>
              ))}
            </div>
            <div className="rating">
              {'★'.repeat(Math.floor(profile.rating))}
              {'☆'.repeat(5 - Math.floor(profile.rating))}
              <span>({profile.rating})</span>
            </div>

            {/* Accept Request Button */}
            {!acceptedRequests.includes(profile.name) ? (
              <button
                className="accept-request-button"
                onClick={() => handleAcceptRequest(profile.name)}
              >
                Accept Request
              </button>
            ) : (
              <span className="accepted-status">Request Accepted</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LMA;
