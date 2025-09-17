// pages/Settings.js
import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Toggle.css";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preferences</h2>
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
  );
};

export default Settings;
