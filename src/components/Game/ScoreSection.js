import React, { useEffect } from 'react';
import './ScoreSection.css'; // Import your CSS file for styling
import Confetti from './confetti anim/Confetti';

const ScoreSection = () => {
  const score = Math.floor(Math.random() * 3) + 2; // Generate a random score between 2 to 4

  useEffect(() => {
    if (score === 4) {
      // Show confetti animation only when score reaches 4
      Confetti();
    }
  }, [score]);

  return (
    <div className="score-container">
      <Confetti />
      <h2 className="score-header">Your Score</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(score / 5) * 100}%` }}></div>
      </div>
      <div className="score-details">
        <div className="score-item">Score: {score}</div>
        <div className="score-item">Out of: 5</div>
        <div className="score-item">{`${(score / 5) * 100}%`}</div>
      </div>
      <div className="correct-incorrect">
        <div className="correct">Correct: {score}</div>
        <div className="incorrect">Incorrect: {5 - score}</div>
      </div>
      <button className="view-results">View Results</button>
      <button className="same-width-button">Same Width Button Again</button>
      <div className="continue-retake">
        <button className="continue">Continue with Pathway</button>
        <button className="retake">Retake Assessment</button>
      </div>
    </div>
  );
};

export default ScoreSection;