// src/components/Header.jsx
import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login")
  };

  return (
    <div className="dashboard-header">
      <h2>Support Desk</h2>
      <div className="header-right">
        <FaUserCircle size={28} className="profile-icon" />
        <span className="username">{user?.name}</span>
        <FaSignOutAlt
          size={24}
          className="logout-icon"
          onClick={handleLogout}
          title="Logout"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Header;
