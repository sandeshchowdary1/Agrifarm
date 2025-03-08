import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SR.css';
import farmerimage from './farmerimage.jpg';
import labourimage from './labourimage.jpg';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";

const SR = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleProceed = () => {
    if (!selectedRole) {
      alert('Please select a role to proceed.');
      return;
    }

    if (selectedRole === 'Farmer') {
      navigate('/farmer-dashboard');
    } else if (selectedRole === 'Laborer') {
      navigate('/labour-dashboard');
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="role-selection-container">
    <h1 className="role-selection-heading">{t('select_role')}</h1>
  
    <div className="role-buttons">
      <div className="role-option">
        <img src={farmerimage} alt="Farmer" />
        <button
          className={`role-button ${selectedRole === 'Farmer' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('Farmer')}
        >
          {t('farmer')}
        </button>
      </div>
  
      <div className="role-option">
        <img src={labourimage} alt="Laborer" />
        <button
          className={`role-button ${selectedRole === 'Laborer' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('Laborer')}
        >
          {t('labour')}
        </button>
      </div>
    </div>
  
    <button className="proceed-button" onClick={handleProceed}>
    {t('proceed')}
    </button>
  </div>
  );
};

export default SR;
