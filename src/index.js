import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import App from './App'; // Import the main App component

// Use createRoot to render your App component
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
