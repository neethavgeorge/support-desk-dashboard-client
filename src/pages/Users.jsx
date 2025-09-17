import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");
  useEffect(() => {
    //const token = localStorage.getItem("token");

    fetch("https://support-desk-dashboard-server.onrender.com/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Users API response:", data);  // 👀 Check here
      setUsers(data.users || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);
const handleUpdateUser = (id, updates) => {
  fetch(`https://support-desk-dashboard-server.onrender.com/api/admin/users/manage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      return res.json();
    })
    .then((updatedUser) => {
      // Ensure updated user merges with existing instead of replacing wrongly
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, ...updatedUser } : u))
      );
    })
    .catch((err) => console.error("Update user error:", err));
};


  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* ✅ Reusable Header */}
        <Header />
<div style={{ flex: 1, padding: "20px" }}>
          <h2>Manage Users</h2><br></br>
        {/* Users List */}
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
         <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user, index) => (
                <tr key={user?._id || index}>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    <select
                      value={user?.role}
                      onChange={(e) =>
                        handleUpdateUser(user?._id, { role: e.target.value })
                      }className="role-select"
                    >
                      <option value="employee">Employee</option>
                      <option value="support">Support</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <label className="status-toggle">
            <input
                type="checkbox"
                checked={user.is_active}
                onChange={(e) =>
                handleUpdateUser(user._id, { is_active: e.target.checked })
                }
            />
            <span className="slider"></span>
          </label>
          <span className={`status-label user?.is_active === true || user?.is_active === "true" ? "active" : "inactive"}`}>
            {user?.is_active === true || user?.is_active === "true" ? "Active" : "Inactive"}
          </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
};

export default Users;
