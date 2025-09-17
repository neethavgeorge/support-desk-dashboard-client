import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "../styles/Login.css";
import { NavLink } from "react-router-dom";
import supportImg from "../images/support.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  // const [forgotEmail, setForgotEmail] = useState("");
  // const [showForgot, setShowForgot] = useState(false);
  // const [message, setMessage] = useState("");
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://support-desk-dashboard-server.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      
    });

    const data = await res.json();

    if (res.ok) {
      login({ user: data.user, token: data.token });
      navigate("/dashboard"); // redirect
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
// const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
//         email: forgotEmail,
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error sending reset email");
//     }
//   };
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side with Image */}
        <div className="login-image">
          <img
            src={supportImg}
            alt="Support"
          />
        </div>

        {/* Right Side with Form */}
        <div className="login-form">
          <h2>WELCOME BACK</h2>
          <p>Welcome back! Please enter your details.</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-login">Sign in</button>
          </form>

          <p className="signup-text">
            Don’t have an account? <a href="/signup">Sign up!</a>
          </p>
          <NavLink className="item" to="/forgotpassword"><p className="forgot-link" >
          Forgot Password?
        </p></NavLink>

        {/* {showForgot && (
          <div className="forgot-password">
            <h3>Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        )} */}
      </div>
    </div>
        </div>
      
  );
};

export default Login;
