import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faInfoCircle,faCog } from '@fortawesome/free-solid-svg-icons';
import './Forgetpass.css'
import { FaEnvelope } from 'react-icons/fa';

const ForgetPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <div className="sidebar">
        <a href="/settings" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </a>
        <a href="/info" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faCog} />
        </a>
      </div>
      
      <div className="lp" style={{ marginLeft: '-300px', position: 'absolute', top: '150px' }}>
        <img src="/logo.jpg" alt="Logo" style={{ height: '250px', borderRadius: '125px' }} />
      </div>
      <div className="container">
        
          <div className="forget-password-container">
            <div className="create-new-line">
              <h2>Forget</h2>
            </div>
            <div className="account-line">
              <h1>Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <h4>New Password</h4>
              </div>
              <div className="input-container">
                <FaEnvelope icon={faEnvelope} className="icon" />
                <input className="input-field" type="text" placeholder="Enter your email here" />
              </div>
              <button type="submit" className="send-btn">SEND OTP</button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default ForgetPassword;
