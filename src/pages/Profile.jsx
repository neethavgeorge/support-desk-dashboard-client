import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Profile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .get("https://support-desk-dashboard-server.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://support-desk-dashboard-server.onrender.com/api/users/me",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://support-desk-dashboard-server.onrender.com/api/users/me/password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Password change failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* ✅ Reusable Header */}
        <Header />
    <div className="profile-container">
      <h2>My Profile</h2>

      <form onSubmit={handleProfileUpdate} className="profile-form">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      <form onSubmit={handlePasswordChange} className="profile-form">
        <label>Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Profile;
