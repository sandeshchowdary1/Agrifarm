import React, { useState,useEffect } from "react";
import OtpTwilio from "./OtpSUP"; // Import OtpTwilio
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";
import { useNavigate } from "react-router-dom";
import "./SUP.css";
import { Volume2 } from "lucide-react";

const SUPotp = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    mobile: "+91",
    address: "",
    profilePhoto: null,
  });
  const [otpVerified, setOtpVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure the mobile input always starts with +91
    if (name === "mobile") {
      if (!value.startsWith("+91")) {
        setFormData({ ...formData, mobile: "+91" });
      } else {
        setFormData({ ...formData, mobile: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //const handleFileChange = (e) => {
    //setFormData({ ...formData, profilePhoto: e.target.files[0] });
  //};

  const onOtpVerification = (isVerified) => {
    setOtpVerified(isVerified);
  };

  const navigate = useNavigate();

const onSubmit = (e) => {
  e.preventDefault();
  if (!otpVerified) {
    alert("Please verify OTP before proceeding.");
    return;
  }
  //alert("Registration Successful! Redirecting...");
  navigate("/SR");  // Navigate only if OTP is verified
};
  const { t } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">{t('signup')}</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>{t('name')}<Volume2 size={20} className="text-blue-600" /></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('enter_name')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('gender')}</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">{t('select_gender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('address')}</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder={t('enter_adress')}
              required
            ></textarea>
          </div>

  <div className="form-group">
  <label>{t('mobile')}</label>
  <input
    type="text"
    name="mobile"
    value={formData.mobile}
    onChange={handleInputChange}
    placeholder={t('mobile')}
    pattern="^\+91[0-9]{10}$" // Ensures number starts with +91 and has 10 digits after it
    required
  />
</div>


          {/* OTP Verification Component */}
          <OtpTwilio mobileNumber={formData.mobile} onVerify={onOtpVerification} />

          <button type="submit" className="submit-button" disabled={!otpVerified}>
            {t('register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SUPotp;
