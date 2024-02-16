import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    //logo
    <>
          {/*logo*/}
          <div className="logo-wrapper">
              <img className="logo-icon" src="/Bhasha.png" alt="Logo" />
          </div>

          {/*sidebar*/}
          <div className="login-container">
              <div className="sidebar">
                  <a href="#home"><i className="fa fa-fw fa-info-circle"></i> </a>
                  <a href="#services"><i className="fa fa-fw fa-cog"></i> </a>

              </div>
              <div className="login-text">
                  <h1>Log in</h1>
                  <p>Welcome back! Log in to access our website.</p>
                  <p>Did you forget your password? <Link to="/forget-password">Reset it here.</Link></p>
              </div>

              <form>
                  <input type="text" placeholder="Login" />
                  <input type="password" placeholder="Password" />
                  <button type="submit">Login</button>
              </form>

              <div className="social-icons">
                  <a href="#"><img src="/google.png" alt="Google" class="size" /></a>
                  <a href="#"><img src="/fb.png" alt="fb" class="size" /></a>
                  <p><Link to="google.com">Not registered? <Link to="/register">Create an account</Link></Link></p>
              </div>
          </div></>
  );
};

export default Login;
