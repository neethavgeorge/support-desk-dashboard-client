import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/NewTicketModal.css";

const NewTicketModal = ({ onClose }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://support-desk-dashboard-server.onrender.com/api/tickets/",
        { title, description, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ticket created!");
      onClose(); // close modal
      window.location.reload(); // refresh ticket list
    } catch (err) {
      alert("Error creating ticket: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Ticket</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="btn-submit">Create</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicketModal;
