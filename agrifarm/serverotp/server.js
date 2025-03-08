require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);
const otpStore = {}; // Store OTPs temporarily

// Generate and send OTP
app.post("/send-otp", async (req, res) => {
    const { mobileNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[mobileNumber] = otp;

    try {
        await client.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: twilioPhone,
            to: mobileNumber,
        });

        res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending OTP", error });
    }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
    const { mobileNumber, otp } = req.body;
    
    if (otpStore[mobileNumber] === otp) {
        delete otpStore[mobileNumber]; // Remove OTP after verification
        res.json({ success: true, message: "OTP verified successfully!" });
    } else {
        res.json({ success: false, message: "Invalid OTP!" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
