import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNew from './pages/CreateNew';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Homepage from './pages/Homepage';
import Footer from './pages/Footer';
import Header from './pages//Header';

import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<CreateNew />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
