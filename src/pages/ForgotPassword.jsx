import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";   // 👈 custom CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://support-desk-dashboard-server.onrender.com/api/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message || "Password reset email sent!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        {message && <p className="forgot-message">{message}</p>}

        <div className="forgot-footer">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
