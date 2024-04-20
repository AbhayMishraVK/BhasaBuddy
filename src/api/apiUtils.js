// src/api/apiUtils.js
import axios from 'axios';
// src/components/SomeComponent.js
import api from './apiConfig';



//For Login with endpoint /uer/login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/user/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const fetchUserData = async () => {
    try {
        const response = await axios.get('/user/login');
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// //FOR SIGNUP WITH USER ENDPOINT /user/signup
// export const signUpUser = async (username, email, password) => {
//     try {
//         const response = await axios.post('/user/signup', { username, email, password });
//         return response.data;
//     } catch (error) {
//         throw error.response.data.message;
//     }
// };

export const signUpUser = async (username, email, password) => {
    try {
        console.log(username, email, password);
        const response = await axios.post('/user/signup', { username, email, password });


        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const fetchSignupData = async () => {
    try {
        const response = await axios.get('/user/signup');
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

//FOR FORGET with ENDPOINT /user/forget

export const fetchForgottenPasswordDetails = async () => {
    try {
        const response = await axios.get('/user/forget');
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const sendNewPassword = async (email) => {

    try {
        const response = await axios.post('/user/forgotPassword',{email});
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

//FUNCTION FOR NEW PASSWORD ENdPOINT /user/setnewpassword

export const setNewPassword = async (email, confirmPassword) => {
    try {
      const newPassword = confirmPassword;
      const response = await axios.post('/user/setNewPassword', { email, newPassword, confirmPassword });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  // Function for start streak Endpoint  /user/startstreak
export const startStreak = async () => {
    try {
      const response = await axios.post('/user/startstreak');
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

// Function to set the user's native language with endpoint /user/setlanguage
export const setNativeLanguage = async (email, language, committedTime) => {
  try {
    const response = await axios.post('/user/level', {email, language, committedTime });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to verify OTP
export const verifyOTP = async (otp,email) => {
  try {
    const response = await axios.post('/user/verify-otp', { otp,email});
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


///////////////// RRESENT OTP IS NOT ANY NEW ENDPOINT ////////////////

// Function to resend OTP
export const resendOTP = async () => {
  try {
    const response = await axios.post('/user/resendotp');
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

/*export const commitedTime = async () => {
    try{
const response = await axios.post('/updatedleveltime', { level, committedTime, email });
      console.log(response.data);
    }
      // Handle response data as needed
    catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
};
*/

//get_update_score api
const fetchUserScore = async (email,score) => {
  try {
    const response = await axios.post('/user/game_score_update', { email ,score});
    if (response.status === 200) {
      return response.data.score;
    } else {
      throw new Error('Failed to fetch user score:', response.data.error);
    }
  } catch (error) {
    throw new Error('Error fetching user score:', error.message);
  }
};
export { fetchUserScore };

//setting native langauge
export const saveNativeLanguage = async (nativeLanguage) => {
  try {
    const response = await api.post('/selectlanguage', { nativeLanguage });
    return response.data; // You can return data from the response if needed
  } catch (error) {
    throw error;
  }
};

//quiz game
export const fetchCorrectAnswerQuiz = async () => {
  try {
    const response = await api.get('/correct-answer-quiz');
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};



