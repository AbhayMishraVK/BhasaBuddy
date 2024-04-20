import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../api/apiUtils';
import logoDark from '../images/bbLogo.svg';

const FinalVerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(true); // State to manage showing/hiding OTP

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleInputChange = (e) => {
        setOTP(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(otp, email);
            const response = await verifyOTP(otp, email);
            setLoading(false);
            if(response.status === 404) {
                setError('Wrong OTP entered');
            }
            if (response.status === 200) {
                
                const signupStored = localStorage.getItem('signUp');

                console.log(signupStored)

                if(signupStored == "yes")
                {
                    navigate('/language');
                    localStorage.setItem('signUp', 0);
                    localStorage.setItem('email', email);
                }
                else {
                    navigate('/setpassword');
                } 
            } 
        } catch (error) {
            if (error.status === 404) {
                setError('Wrong OTP entered');
            }
            console.error('OTP verification failed:', error);
            setError('OTP verification: Unknown error occurred');
            setLoading(false);
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
                                                <h5 className="nk-block-title">Verify OTP</h5>
                                                <div className="nk-block-des">
                                                    <p>Enter the 6-digit OTP sent to your email: {email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type={showOTP ? "text" : "password"} // Show/hide OTP based on showOTP state
                                                    value={otp}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="form-control form-control-lg"
                                                    maxLength="6"
                                                />
                                                <span
                                                    className="toggle-otp" // Toggle button to show/hide OTP
                                                    onClick={() => setShowOTP(!showOTP)}
                                                >
                                                    {showOTP ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" disabled={loading} className="btn btn-lg btn-primary btn-block">
                                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                                </button>
                                            </div>
                                        </form>
                                        {error && <div style={{ color: 'red' }}>{error}</div>}
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

export default FinalVerifyOtp;
