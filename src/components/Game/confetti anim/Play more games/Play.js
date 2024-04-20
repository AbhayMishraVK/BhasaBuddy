import React from 'react';
import './Play.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const PlayMoreButton = () => {
  return (
    <div className="play-more-container">
       <div className="hand-drawn-container">
        <img src='./hand-link.gif' alt='hand' className="hand-drawn-image"></img>
      </div>
      <Link to="/quiz-game" className="play-more-link"> {/* Replace "/your-link-url" with the actual URL you want to link to */}
        <button className="play-more-button">
          <p className="text">PLAY MORE</p>
          <div className="animation"></div>
        </button>
      </Link>
    </div>
  );
}

export default PlayMoreButton;
