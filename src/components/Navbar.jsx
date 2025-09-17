import React from "react";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav-left">
        <div className="brand-dot" />
        <h1>Support Desk</h1>
      </div>

      <div className="nav-right">
        <div className="search">
          <input placeholder="Search tickets..." />
        </div>
        <div className="profile">
          <div className="avatar">{(user?.name || user?.role || "U")[0].toUpperCase()}</div>
          <div className="meta">
            <div className="name">{user?.name || "User"}</div>
            <div className="role">{(user?.role || "").toUpperCase()}</div>
          </div>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
