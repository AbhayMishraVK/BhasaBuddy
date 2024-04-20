import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { forgotPassword } from '../api/apiUtils'; // Assuming you have a similar utility function for forgot password
import { sendNewPassword } from '../api/apiUtils';
import logoDark from '../images/bbLogo.svg';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email)
            const responseData = await sendNewPassword(email);
            const userEmail = responseData;
            console.log(userEmail)
            if (responseData) {
                console.log(responseData.status);
                if (responseData.status === 200) {
                    // Save user email to localStorage
                    localStorage.setItem('userEmail', email);
                    navigate('/verifyotp');
                }
            } else {
                console.error('Response data is invalid:', responseData);
                setError('Response data is invalid');
            }
        } catch (error) {
            console.error('Error sending new password:', error);
            setError('Error sending new password: ' + error);
        }
    };

    return (
        <div className="nk-body bg-white npc-general pg-auth">
            <div className="nk-app-root">
                <div className="nk-main">
                    <div className="nk-wrap nk-wrap-nosidebar">
                        <div className="nk-content">
                            <div className="nk-split nk-split-page nk-split-md">
                                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
                                    <div className="nk-block nk-block-middle nk-auth-body">
                                        <div className="brand-logo pb-5">
                                            <a href="/home" className="logo-link">
                                                <img className="logo-dark logo-img logo-img-lg" src={logoDark} alt="logo-dark" />  <h3 style={{ display: 'inline', marginTop: '100px' }}>Bhasa Buddy</h3>
                                            </a>
                                        </div>
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h5 className="nk-block-title">Reset Password</h5>
                                                <div className="nk-block-des">
                                                    <p>Enter your email to receive a password reset link.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <div className="form-control-wrap">
                                                    <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Send Reset Link</button>
                                            </div>
                                        </form>
                                        <div className="form-note-s2 pt-4">Remembered your password? <a href="/login">Sign in</a></div>
                                    </div>
                                </div>
                                <div className="nk-split-content nk-split-stretch bg-abstract"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;