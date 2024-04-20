import React, { useState } from 'react';
import logoDark from '../images/bbLogo.svg';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/apiUtils';



const FinalLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Email or Username:', email);
        console.log('Password:', password);

        try {
            // Assuming loginUser is defined somewhere
            const responseData = await loginUser(email, password);
            console.log(responseData);
            const userEmail = email;
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('email', userEmail);

            if (responseData.status === 200) {
                navigate('/home');
            } else {
                console.error('Login failed:', responseData);
            }
        } catch (error) {
            console.error('Login failed:', error);
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
                                        <div className="brand-logo pb-5">
                                            <a href="/home" className="logo-link">
                                                <img className="logo-dark logo-img logo-img-lg" src={logoDark} alt="logo-dark" />  <h3 style={{ display: 'inline', marginTop: '100px' }}>Bhasa Buddy</h3>
                                            </a>
                                        </div>
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h5 className="nk-block-title">Sign-In</h5>
                                                <div className="nk-block-des">
                                                    <p>Access the Bhasha Buddy using your email and passcode.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <div className="form-control-wrap">
                                                    <input type="text" className="form-control form-control-lg" id="email" placeholder="Enter your email address or username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div class="form-label-group">
                                                    <label class="form-label" for="password">Passcode</label>
                                                    <a class="link link-primary link-sm" tabindex="-1" href="/forgetPassword">Forgot Code?</a>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your passcode" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
                                            </div>
                                        </form>
                                        <div className="form-note-s2 pt-4">New on our platform? <a href="/signup">Create an account</a></div>
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

export default FinalLogin;
