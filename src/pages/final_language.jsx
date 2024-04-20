import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoDark from '../images/bbLogo.svg'; 
import { setNativeLanguage } from '../api/apiUtils';

const FinalLanguage = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('');
    const [studyTime, setStudyTime] = useState('');
    const [error, setError] = useState('');

    // Retrieve user email from local storage
    const userEmail = localStorage.getItem('userEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!language || !studyTime) {
            setError('Please select a language and enter your study time.');
            return;
        }

        try {
            // Call your API function to send language level and committed time
            const responseData = await setNativeLanguage(userEmail, language, studyTime);
            console.log(responseData);  
            if (responseData.status === 200) {
                // If successful, navigate to the home page
                navigate('/home');
            } else {
                // Handle other status codes if needed
                setError('Failed to set native language.');
            }
        } catch (error) {
            console.error('Error setting native language:', error);
            setError('Failed to set native language.');
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
                                                <h5 className="nk-block-title">Select Language and Study Time</h5>
                                                <div className="nk-block-des">
                                                    <p>Choose your preferred language and enter the total study time in minutes per day.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="language">Language</label>
                                                <div className="form-control-wrap">
                                                    <select className="form-control form-control-lg" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} required>
                                                        <option value="">Select Language</option>
                                                        <option value="hindi">Hindi</option>
                                                        <option value="marathi">Marathi</option>
                                                        <option value="punjabi">Punjabi</option>
                                                        <option value="gujarati">Gujarati</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="studyTime">Study Time (in minutes)</label>
                                                <div className="form-control-wrap">
                                                    <input type="number" className="form-control form-control-lg" id="studyTime" placeholder="Enter study time in minutes" value={studyTime} onChange={(e) => setStudyTime(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
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

export default FinalLanguage;