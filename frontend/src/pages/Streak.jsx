import React from 'react';
import './Streak.css'; // Import CSS file for styling

function StreakPage() {
    const startLesson = () => {
        console.log('Start lesson clicked');
        // Add your logic here
    };

    const okGotIt = () => {
        console.log('OK, got it! clicked');
        // Add your logic here
    };

    return (
        <div className="streak-container">
            <svg className="streak-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {/* SVG elements go here */}
            </svg>
            <div className="streak-content">
                <h1>Start a streak</h1>
                <p>Hit the books daily to level up your streak and craft a killer learning routine</p>
                <button onClick={startLesson}>START LESSON</button>
                <button onClick={okGotIt}>OK, got it!</button>
            </div>
        </div>
    );
}

export default StreakPage;
