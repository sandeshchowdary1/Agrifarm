import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Change here
import './Profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'harsha',
    phone: '9328738397',
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();  // Change here

  // Handle input changes for editing user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(URL.createObjectURL(file));
    setUserDetails({ ...userDetails, image: file });
  };

  // Handle logout
  const handleLogout = () => {
    // You can clear session or authentication tokens here if needed
    navigate('/login');  // Change here to use navigate
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Your Profile</h2>

        {/* Image Section */}
        <div className="profile-image-section">
          <img
            src={newImage || userDetails.image || 'default-avatar.png'}
            alt="Profile"
            className="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload-button"
          />
        </div>

        {/* User Details Section */}
        <div className="profile-details">
          <div className="profile-item">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userDetails.name}</p>
            )}
          </div>

          

          <div className="profile-item">
            <label>Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userDetails.phone}</p>
            )}
          </div>
        </div>

        {/* Edit and Save Buttons */}
        <div className="button-group">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="save-button"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit Details
            </button>
          )}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
