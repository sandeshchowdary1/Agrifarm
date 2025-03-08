import React, { useState } from "react";
import axios from "axios";

const OtpTwilio = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState("");

    const sendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/send-otp", { mobileNumber });
            if (response.data.success) {
                setOtpSent(true);
                //setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Error sending OTP. Try again!");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { mobileNumber, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error verifying OTP.");
        }
    };

    return (
        <div className="container">
            <h2>OTP Verification</h2>
            <input
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button onClick={sendOtp} disabled={otpSent}>Send OTP</button>

            {otpSent && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}

            <p>{message}</p>
        </div>
    );
};

export default OtpTwilio;
