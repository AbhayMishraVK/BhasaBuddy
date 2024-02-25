import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './VerifyOtp.css'; // Import your CSS file if needed

const VerifyOTP = () => {
  return (
    <div className="main">
      <div className="logo">
        <img src="/logo.jpg" style={{ height: '250px', marginTop: '50px', borderRadius: '125px' }} alt="Logo" />
      </div>
      <div className="containerr">
        <h1><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />Verify OTP</h1>
        <form id="otpForm">
          <div className="otp-inputs">
            <input type="text" className="otp-field" maxLength={1} required />
            <input type="text" className="otp-field" maxLength={1} required />
            <input type="text" className="otp-field" maxLength={1} required />
            <input type="text" className="otp-field" maxLength={1} required />
            <input type="text" className="otp-field" maxLength={1} required />
            <input type="text" className="otp-field" maxLength={1} required />
          </div>
          <button type="submit" className="verify-btn">Verify OTP</button>
        </form>
        <h2 className="resend">Didn't receive it? <a href="#">Resend it</a></h2>
      </div>
    </div>
  );
};

export default VerifyOTP;
