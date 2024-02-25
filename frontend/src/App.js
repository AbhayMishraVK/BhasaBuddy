import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signu from './pages/Signup'
import YourComponent from './components/Sidebar';
import ForgetPassword from './pages/Forgetpassword';
import VerifyOTP from './pages/VerifyOtp';
import SetNewPassword from './pages/SetNewPass';
import StreakPage from './pages/Streak'


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <YourComponent/>
        </header>
        <main>
          <Routes>
            <Route exact path="/user/login" element={<Login/>} /> {/* Route for login */}
            <Route path="/user/signup" element={<Signu/>} /> {/* Route for login */}
            <Route path="/user/forgetpassword" element={<ForgetPassword/>}/>
            <Route path="/user/verifyotp" element={<VerifyOTP/>}/>
            <Route path="/user/setnewpassword" element={<SetNewPassword/>}/>
            <Route path="/user/streak" element={<StreakPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
