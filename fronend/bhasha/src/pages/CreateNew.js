import React from 'react';
import './CreateNew.css'; // Import CSS file for styling
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


const CreateNew = () => {
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

        {/* Form */}
        <div className="form-wrapper">
          <div className="create-new-line">
            <h2>Create New</h2>
          </div>
          <div className="account-line">
            <h2>Account</h2>
          </div>
          <div className="login-link">Already registered? <a href="/login">Login</a></div>
          <form>
            <div class="input-container">
                <i class="fa fa-user fa-2x icon"></i>
                <input type="text" placeholder="Username" className="input-field" />
            </div>
            
            <div class="input-container">
                  <i class="fa fa-envelope fa-2x icon"></i>
                  <input type="text" placeholder="Gmail" className="input-field" />
            </div>
            <div class="input-container">
                <i class="fa fa-lock fa-2x icon"></i>
                <input type="password" placeholder="Password" className="input-field" />
            </div>
            <button type="submit" className="signup-btn">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
