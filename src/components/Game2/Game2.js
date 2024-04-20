import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game2.css'; // Import your CSS file

function GameLayout() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          'http://localhost:5000/correct_answer_quiz'
        );
        setQuestions(response.data.questions);
      } catch (error) {
        setError('Failed to fetch questions');
      }
    }
    fetchQuestions();
  }, []);

  // Dummy data if API request fails or errors
  const dummyQuestions = [
    {
      question: "What is the capital of France?",
      options: {
        A: "Paris",
        B: "London",
        C: "Berlin",
        D: "Rome"
      },
      correct_option: "A"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: {
        A: "Atlantic Ocean",
        B: "Indian Ocean",
        C: "Arctic Ocean",
        D: "Pacific Ocean"
      },
      correct_option: "D"
    },
    // Add more questions as needed
  ];
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setMessage('');
    } else {
      // Handle the end of questions
      // Show score
      //alert(`Your score: ${score}`);
    }
  };

  const handleAnswer = (option) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = option;
    setUserAnswers(updatedUserAnswers);

    if (option === questions[currentQuestionIndex].correct_option) {
      setScore(prevScore => prevScore + 1);
      setMessage('Correct!');
    } else {
      setMessage('Incorrect!');
    }
  };

  return (
    <div className="container-with-bg">
      <div className="container">
        <img src="/welcome.gif" alt="welcome" />
        <div className="blue-sky-section">
          <img className="user-picture" src="/profile1/user.jpeg" alt="User Picture" />
          <span className='textcolor'>Move the word to the correct answer</span>
          <div className='parent'>
            <div className="text-center">
              {(questions.length > 0 || dummyQuestions.length > 0) && (
                <div key={currentQuestionIndex} className="section">
                  <div>
                    {(questions.length > 0) ? questions[currentQuestionIndex].question : dummyQuestions[currentQuestionIndex].question}
                  </div>
                  <div>
                    {Object.keys((questions.length > 0) ? questions[currentQuestionIndex].options : dummyQuestions[currentQuestionIndex].options).map(option => (
                      <button 
                        key={option} 
                        onClick={() => handleAnswer(option)}
                        style={{ backgroundColor: userAnswers[currentQuestionIndex] === option ? 'green' : 'blue' }}
                      >
                        {(questions.length > 0) ? questions[currentQuestionIndex].options[option] : dummyQuestions[currentQuestionIndex].options[option]}
                      </button>
                    ))}
                  </div>
                  {message && <div>{message}</div>}
                </div>
              )}
              <button className="next" onClick={handleNextQuestion}>Next</button>
              <div className='score'>Score: {score}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLayout;
