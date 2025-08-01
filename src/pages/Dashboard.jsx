import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>{ticket.title} - {ticket.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
