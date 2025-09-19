import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const NewTicket = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://support-desk-dashboard-server.onrender.com/api/tickets/",
        { title, description, priority },
        { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("✅ Ticket created successfully!");
        onSuccess(res.data); // refresh tickets list in dashboard
        console.log(res.data)
        onClose(); // close modal
      } catch (err) {
        console.error("Error creating ticket:", err.response?.data || err.message);
        alert("❌ Failed to create ticket");
      }
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Create New Ticket</h3>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
          <textarea
            placeholder="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Create Ticket</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};




//   return (
//     <div>
//       <h2>New Ticket</h2>
//       <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
//       <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
//       <button onClick={submitTicket}>Submit</button>
//     </div>
//   );
// }

export default NewTicket;
