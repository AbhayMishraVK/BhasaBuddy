import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaKey } from 'react-icons/fa';

const Login = () => {
    return (
        <div className="containerrr">
            <div className="lp" style={{ marginLeft: '300px', position: 'absolute', top: '150px' }}>
                <img src="/logo.jpg" alt="Logo" style={{ height: '250px', borderRadius: '125px' }} />
            </div>
            <div className="login-container">
                <div className="login-text">
                    <h1>Log in</h1>
                    <p>Welcome back! Log in to access our website.</p>
                    <p>Did you forget your password? <a href="/user/forgetpassword">Reset it here.</a></p>
                </div>
                <form >
                    <div className="input-container">
                         <FaEnvelope className="icon" />
                        <input className="input-field" type="text" placeholder="Email" name="email" />
                    </div>
                    <div className="input-container">
                    <FaKey className="icon" />
                        <input className="input-field" type="password" placeholder="Password" name="password" />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="social-icons">
                    <a href="#"><img src="/google.png" alt="Google" className="size" /></a>
                    <a href="#"><img src="/fb.png" alt="Facebook" className="size" /></a>
                    <p>Not registered? <a href="/user/signup">Create an account</a></p>
                </div>
                
            </div>
        </div>
    );
};

export default Login;
