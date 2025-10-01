import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Toggle.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const { user } = useAuth();
   const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      <div className="section">
        <div className="section-title">Main</div>
        <NavLink className="item" to="/dashboard">🏠 Dashboard</NavLink>
        <NavLink to="/profile" className="item">
              <FaUser className="mr-2" /> Profile
            </NavLink>
        {/* <NavLink className="item" to="/tickets">🎫 Tickets</NavLink> */}
        {/* {(user?.role === "employee") && (
          <NavLink className="item" to="/tickets/create">➕ Create Ticket</NavLink>
        )} */}
      </div>

      {user?.role === "admin" && (
        <div className="section">
          <div className="section-title">Admin</div>
          <NavLink className="item" to="/admin/users">👤 Users</NavLink>
          <NavLink className="item" to="/reports">📈 Reports</NavLink>
        </div>
      )}

      <div className="section">
        {/* <div style={{ padding: "20px" }}> */}
      <div className="section-title">Settings</div>
      <p>Current Theme: <b>{theme}</b></p>
       <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </div>

      {/* </div> */}
    </aside>
  );
}
