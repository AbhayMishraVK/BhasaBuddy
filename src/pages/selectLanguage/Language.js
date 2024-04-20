// Language.js
import React, { useState ,useEffect} from 'react';
import './Language.css';
import { useNavigate } from 'react-router-dom';
import { saveNativeLanguage } from '../../api/apiUtils';
const Language = () => {
  const navigate = useNavigate();
  const [nativeLanguage, setNativeLanguage] = useState('');

  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve email from local storage when the component mounts
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await saveNativeLanguage(nativeLanguage); // Call the API function
      if(response.status == 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleInputChange = (event) => {
    setNativeLanguage(event.target.value);
  };

  return (
    <body style={{ background: 'linear-gradient(to bottom right, #4CAF50, #2196F3)' }}>
      <div className="language-container">
        <div className="question-container">
          <p className="question">What is your native language?</p>
          <input
            className="input-box"
            type="text"
            placeholder="Type Here"
            value={nativeLanguage}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit} className='submit'>Submit</button>
        <div className='con2'>
          <div className="logo-container">
            <img className="logo" src="/logo.png" alt="Logo" />
          </div>
          <div className="bhasha-buddy-container">
            <p className="bhasha-buddy">Bhasha Buddy</p>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Language;