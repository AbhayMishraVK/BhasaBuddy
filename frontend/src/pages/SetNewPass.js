import React, { useState } from 'react';
import './SetNewPass.css'; // Make sure to import your CSS file

const SetNewPassword = () => {
    
  return (
    <div className="main">
      <div className="lp">
        <img src="/logo.jpg" style={{ height: '250px', marginTop: '50px', borderRadius: '125px' }} alt="Logo" />
      </div>
      <div className="containerrrr">
        <h1 className='set'>Set New Password</h1>
        <form id="passwordForm">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <button type="submit">Set Password</button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
