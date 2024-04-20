import React, { useState } from 'react';
import { setNewPassword } from '../api/apiUtils';
import { useNavigate } from 'react-router-dom';
import logoDark from '../images/bbLogo.svg'; // Assuming this is the logo you want to use

const FinalSetPassword = () => {
    const navigate = useNavigate();
    const [newPassword, changeNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const userEmail = localStorage.getItem('userEmail');
            console.log(userEmail, newPassword)
            const responseData = await setNewPassword(userEmail, newPassword);
            console.log(responseData);
            changeNewPassword('');
            setConfirmPassword('');

            if (responseData.status === 200) {
                navigate('/home');
            }

        } catch (error) {
            console.error('Failed to set new password:', error);
            setError('Failed to set new password: ' + error.message);
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
                                                <h5 className="nk-block-title">Set New Password</h5>
                                                <div className="nk-block-des">
                                                    <p>Enter your new password and confirm it.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                                <div className="form-control-wrap">
                                                    <input type="password" className="form-control form-control-lg" id="newPassword" placeholder="Enter new password" value={newPassword} onChange={(e) => changeNewPassword(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="form-control-wrap">
                                                    <input type="password" className="form-control form-control-lg" id="confirmPassword" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Set Password</button>
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

export default FinalSetPassword;