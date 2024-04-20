import React, { useState } from 'react';
import logoDark from '../images/bbLogo.svg';
import { signUpUser } from '../api/apiUtils';
import { useNavigate } from 'react-router-dom';

const FinalSignup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState(null); // Added state for error handling

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({ username, email, password, checkbox });

        try {
            if (checkbox) {
                const responseData = await signUpUser(username, email, password);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('signUp', "yes");

                console.log(responseData.status);
                if (responseData.status === 200) {

                    navigate('/verifyotp');
                }
            }
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Signup failed: ' + (error.message || 'Unknown error occurred'));
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
                                    <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                                        <a href="#" className="toggle btn btn-white btn-icon btn-light" data-target="athPromo"><em className="icon ni ni-info"></em></a>
                                    </div>
                                    <div className="nk-block nk-block-middle nk-auth-body">
                                        <div className="brand-logo pb-3">
                                            <a href="html/index.html" className="logo-link">
                                                <img className="logo-dark logo-img logo-img-lg" src={logoDark} alt="logo-dark" /> <h3 style={{ display: 'inline', marginTop: '100px' }}>Bhasa Buddy</h3>
                                            </a>
                                        </div>
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h5 className="nk-block-title">Register</h5>
                                                <div className="nk-block-des">
                                                    <p>Create New Bhasha Buddy Account</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="name">Name</label>
                                                <div className="form-control-wrap">
                                                    <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <div className="form-control-wrap">
                                                    <input type="text" className="form-control form-control-lg" id="email" placeholder="Enter your email address or username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="password">Passcode</label>
                                                <div className="form-control-wrap">
                                                    <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your passcode" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-control-xs custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox" checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} />
                                                    <label className="custom-control-label" htmlFor="checkbox">I agree to Bhasha Buddy <a href="#">Privacy Policy</a> &amp; <a href="#"> Terms.</a></label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
                                            </div>
                                        </form>
                                        {error && <div className="text-danger">{error}</div>} {/* Display error message if there's any */}
                                        <div className="form-note-s2 pt-4">Already have an account ? <a href="/login"><strong>Sign in instead</strong></a></div>
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

export default FinalSignup;
