import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Assuming you have Font Awesome icons imported
import './Signup.css'
import { FaEnvelope, FaUser,FaLock } from 'react-icons/fa';
const Signu = () => {
    return (
        <div className="container">
            <div className="lp" style={{ marginLeft: '300px', position: 'absolute', top: '150px' }}>
                <img src="/logo.jpg" alt="Logo" style={{ height: '250px', borderRadius: '125px' }} />
            </div>
            <div className="form-wrapper">
                <div className="create-new-line">
                    <h2>Create New</h2>
                </div>
                <div className="account-line">
                    <h2>Account</h2>
                </div>
                <div className="login-link">Already registered? <a href="/user/login">Login</a></div>
                <form >
                    <div className="input-container">
                        <FaUser  className='icon ' />
                        <input type="text" name="username" placeholder="Username" className="input-field" />
                    </div>
                    <div className="input-container">
                        <FaEnvelope  className='icon'/>
                        <input type="email" name="email" placeholder="Email" className="input-field" />
                    </div>
                    <div className="input-container">
                        <FaLock  className='icon'/>
                        <input type="password" name="password" placeholder="Password" className="input-field"  />
                    </div>
                    <button type="submit" className="signup-btn">Signup</button>
                </form>
                
            </div>
        </div>
    
    );
};

export default Signu;
