import React from 'react';
import { Link } from 'react-router-dom';
import './ForgetPassword.css';

const ForgetPassword = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <a href="#home"><i className="fa fa-fw fa-info-circle"></i> </a>
        <a href="#services"><i className="fa fa-fw fa-cog"></i> </a>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Logo */}
        <div className="logo-wrapper">
          <img className="logo-icon" src="/Bhasha.png" alt="Logo" />
        </div>

        {/* Forget Password */}
        <div className="forget-password-container">
          <div className="create-new-line">
            <h2>Forget</h2>
          </div>
          <div className="account-line">
            <h2>Password</h2>
          </div>
          <form>
            <div>
              <i className="fa fa-lock fa-2x icon"></i>
              <input type="password" placeholder="New Password" />
            </div>
            <div>
              <i className="fa fa-envelope fa-2x icon"></i>
              <input type="text" placeholder="Gmail" />
            </div>
            <button type="submit" className="send-btn">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
