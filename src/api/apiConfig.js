// src/api/apiUtils.js
import axios from 'axios';
// import { BASE_URL } from './apiConfig';

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000' // Assuming your backend server is running locally on port 5000
});

// Export the axios instance for use in other parts of your application
export default api;