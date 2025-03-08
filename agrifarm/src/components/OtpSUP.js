import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";

const OtpSUP = ({ mobileNumber, onVerify }) => {
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setOtpSent(false); // Reset OTP state when mobile number changes
    }, [mobileNumber]);

    const sendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/send-otp", { mobileNumber });
            if (response.data.success) {
                setOtpSent(true);
               // setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Error sending OTP. Try again!");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { mobileNumber, otp });
            if (response.data.success) {
                setMessage("OTP Verified!");
                onVerify(true); // Notify parent component
            } else {
                setMessage("Invalid OTP. Try again.");
                onVerify(false);
            }
        } catch (error) {
            setMessage("Error verifying OTP.");
            onVerify(false);
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
        <div>
            <button onClick={sendOtp} disabled={otpSent || !mobileNumber}>{t('Send_otp')}</button>

            {otpSent && (
                <>
                    <input
                        type="text"
                        placeholder={t('enter_otp')}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>{t('verify_otp')}</button>
                </>
            )}

            <p>{message}</p>
        </div>
    );
};

export default OtpSUP;
