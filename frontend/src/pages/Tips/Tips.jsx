import React from 'react';
import './Tips.css';
// import logo from './images/logo.png';

const Tips = () => {
    return (
        <div className="tips-cont">
            <div className="bhasha-buddy-tips">

                <div className="upper">
                    <img style={{ height: '100px' }} src={require('./images/logo.png')} alt="Logo" />
                    <h2>Bhasha Buddy</h2>
                    <h3>TIPS TO LEARN A NEW </h3>
                    <h2 id='lang'>LANGUAGE</h2>
                </div>
                <div className='ul'>
                    <div className="li"><span>1</span>Set Your Language Goals</div>
                    <div className="li"><span>2</span>Connect With Native Speakers</div>
                    <div className="li"><span>3</span>Enhance Your Vocabulary</div>
                    <div className="li"><span>4</span>Be Consistent</div>
                </div>
            </div>
        </div>
    );
};

export default Tips;