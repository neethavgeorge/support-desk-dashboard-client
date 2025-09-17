import React, { useState } from "react";
import "../styles/TicketForm.css";

export default function TicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "", description: "", priority: "medium", category: "general", assignee: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="ticket-form">
      <div className="tf-head">
        <h2>Create Ticket</h2>
        <p className="muted">Fill details to raise a support request</p>
      </div>

      <form onSubmit={submit} className="tf-grid">
        <div className="tf-field">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Unable to login" />
        </div>

        <div className="tf-field tf-col-span-2">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Briefly describe the issue..." />
        </div>

        <div className="tf-field">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </div>

        <div className="tf-field">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="general">General</option>
            <option value="infra">Infrastructure</option>
            <option value="access">Access</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div className="tf-field">
          <label>Assign to</label>
          <input name="assignee" value={form.assignee} onChange={handleChange} placeholder="support@company.com" />
        </div>

        <div className="tf-actions tf-col-span-2">
          <button type="submit" className="btn-primary">Submit Ticket</button>
          <button type="button" className="btn-ghost" onClick={() => setForm({ title:"", description:"", priority:"medium", category:"general", assignee:"" })}>Reset</button>
        </div>
      </form>
    </div>
  );
}
