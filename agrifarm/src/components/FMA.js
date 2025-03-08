import React, { useState } from 'react';
import './FMA.css';

const FMA = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const laborProfiles = [
    {
      id: 1,
      name: 'Ravi',
      workType: 'Planting',
      address: 'Farm Lane, Village A',
      dateFrom: '2025-01-10',
      dateTo: '2025-01-15',
      timeFrom: '08:00',
      timeTo: '16:00',
      paymentMethods: ['Cash', 'Bank Transfer'],
      rating: 4.5,
      profilePhoto: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Sunitha',
      workType: 'Planting',
      address: 'Field Road, Village B',
      dateFrom: '2025-02-01',
      dateTo: '2025-02-05',
      timeFrom: '07:30',
      timeTo: '15:30',
      paymentMethods: ['UPI'],
      rating: 4.8,
      profilePhoto: 'https://via.placeholder.com/100',
    },
  ];

  const handleAcceptRequest = (id) => {
    setAcceptedRequests((prevRequests) => [...prevRequests, id]);
  };

  return (
    <div className="my-activities-container">
      <h2 className="page-title">My Activities</h2>

      <div className="labor-profiles">
        {laborProfiles.map((profile) => (
          <div className="profile-card-FMA" key={profile.id}>
            <img
              src={profile.profilePhoto}
              alt={`${profile.name} profile`}
              className="profile-photo"
            />
            <h3 className="labor-name">{profile.name}</h3>
            <div className="work-type">
              <span className="highlighted">{profile.workType}</span>
            </div>
            <div className="address">
              <span>📍 {profile.address}</span>
            </div>
            <div className="date-time">
              <span>{profile.dateFrom} - {profile.dateTo}</span>
              <span>{profile.timeFrom} - {profile.timeTo}</span>
            </div>

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
            {!acceptedRequests.includes(profile.id) ? (
              <button
                className="accept-request-button"
                onClick={() => handleAcceptRequest(profile.id)}
              >
               Request pending..
              </button>
            ) : (
              <span className="accepted-status">Request Accepted</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FMA;
