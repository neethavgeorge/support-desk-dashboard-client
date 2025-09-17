import React from "react";
import "../styles/TicketList.css";

const sample = [
  { id: "TCK-1042", title: "Email access blocked", status: "Open", priority: "High", assignee: "Alex", created: "2025-08-14" },
  { id: "TCK-1041", title: "VPN not connecting", status: "In Progress", priority: "Medium", assignee: "Priya", created: "2025-08-12" },
  { id: "TCK-1040", title: "Password reset", status: "Closed", priority: "Low", assignee: "Rahul", created: "2025-08-10" }
];

export default function TicketList() {
  return (
    <div className="ticket-list-container">
      <div className="tl-head">
        <h2>Tickets</h2>
        <div className="tl-actions">
          <input className="tl-search" placeholder="Search by title or ID" />
          <select className="tl-filter">
            <option>All</option><option>Open</option><option>In Progress</option><option>Closed</option>
          </select>
        </div>
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Status</th><th>Priority</th><th>Assignee</th><th>Created</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sample.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td className="title-cell">{t.title}</td>
              <td><span className={`badge ${t.status.toLowerCase().replace(" ", "-")}`}>{t.status}</span></td>
              <td><span className={`chip ${t.priority.toLowerCase()}`}>{t.priority}</span></td>
              <td>{t.assignee}</td>
              <td>{t.created}</td>
              <td>
                <button className="link">View</button>
                <button className="link danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
