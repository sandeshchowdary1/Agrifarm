import React, { useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import OtpTwilio from "./OtpSUP"; // Import OTP component
import "./Login.css";
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "+91",
  });

  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage] = useState("");
  const navigate = useNavigate();

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

  const onOtpVerification = (isVerified) => {
    setOtpVerified(isVerified);
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP before proceeding.");
      return;
    }
    navigate("/SR");

    // Dummy registered user check (Replace with actual authentication logic)
    const registeredUsers = [
      { name: "harsha", mobile: "+919121647398", role: "farmer" },
      { name: "raja", mobile: "8977788597", role: "labour" },
    ];

    const user = registeredUsers.find(
      (user) => user.name === formData.name && user.mobile === formData.mobile
    );

    if (user) {
     // alert("Login Successful! Redirecting...");
      navigate(`/SR`);
    } else {
      //setErrorMessage("Invalid credentials or not registered.");
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
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{t('Login_to_AgriFarm')}</h1>
        <form onSubmit={onLogin}>
        <div className="form-group">
            <label>{t('name')}</label>
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
            <label>{t('mobile')}</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder={t('Enter_mobile_Number')}
              pattern="^\+91[0-9]{10}$"
              required
            />
          </div>

          {/* OTP Verification Component */}
          <OtpTwilio mobileNumber={formData.mobile} onVerify={onOtpVerification} />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button" disabled={!otpVerified}>
          {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
