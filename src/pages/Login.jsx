import React from 'react';
import '../styles/Login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src="./src/support.png" alt="Support Agent" />
      </div>
      <div className="login-right">
        <h2>WELCOME BACK</h2>
        <p>Welcome back! Please enter your details.</p>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="********" />
          <button type="submit">Sign in</button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up for free!</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
