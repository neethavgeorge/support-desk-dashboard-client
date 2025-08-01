import React, { useState } from 'react';
import axios from 'axios';

function NewTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const submitTicket = async () => {
    await axios.post("http://localhost:5000/api/tickets", {
      title,
      description,
      employeeId: user._id
    });
    alert("Ticket Submitted!");
  };

  return (
    <div>
      <h2>New Ticket</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <button onClick={submitTicket}>Submit</button>
    </div>
  );
}

export default NewTicket;
