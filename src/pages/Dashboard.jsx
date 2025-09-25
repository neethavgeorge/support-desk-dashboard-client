import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar"; 
import "../styles/TicketsTable.css";
import "../styles/Dashboard.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import NewTicketModal from "../components/NewTicketModal";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const { user, token, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [supportUsers, setSupportUsers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedSupport, setSelectedSupport] = useState("");
  const navigate = useNavigate();

  // Fetch tickets
  useEffect(() => {
    if (!token || !user) return;

    const fetchTickets = async () => {
      try {
        const res = await axios.get("https://support-desk-dashboard-server.onrender.com/api/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data || err.message);
      }
    };

    fetchTickets();
  }, [user, token]);

  // Fetch support users (for dropdown)
  useEffect(() => {
    if (!token) return;

    const fetchSupportUsers = async () => {
      try {
        const res = await axios.get("https://support-desk-dashboard-server.onrender.com/api/admin/support-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSupportUsers(res.data);
      } catch (err) {
        console.error("Error fetching support users:", err.response?.data || err.message);
      }
    };

    fetchSupportUsers();
  }, [token]);

  const fetchTickets = async () => {
      try {
        const res = await axios.get("https://support-desk-dashboard-server.onrender.com/api/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data || err.message);
      }
    };
  // Assign ticket
  const handleAssign = async (e) => {
    if (!selectedSupport || !selectedTicket) return;
 e.preventDefault();
    try {
      await axios.put(
        `https://support-desk-dashboard-server.onrender.com/api/tickets/${selectedTicket}/assign`,
        { supportId: selectedSupport },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ticket assigned!");
      setShowAssignModal(null);
      setSelectedSupport("");
      // window.location.reload();
      // navigate("/dashboard")
      await fetchTickets();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // Resolve ticket
  const resolve = async (ticketId) => {
    try {
      await axios.put(
        `https://support-desk-dashboard-server.onrender.com/api/tickets/${ticketId}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ticket resolved!");
      await fetchTickets();
    } catch (err) {
      alert("Error resolving ticket: " + (err.response?.data?.message || err.message));
    }
  };
const handleViewClick = (ticket) => {
  setSelectedTicket(ticket);
  setIsViewModalOpen(true);
};
  if (!user) {
    return <p>Please login first.</p>;
  }

  // Stats
  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.status === "pending").length,
    completed: tickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    overdue: tickets.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        !["resolved", "closed"].includes(t.status)
    ).length,
  };
const handleLogout = () => {
    logout();
    navigate("/login"); // navigation happens here
  };
// const handleView = (ticket) => {
//     setSelectedTicket(ticket);
//   };

  const closeModal = () => {
    setIsViewModalOpen(null);
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Support Desk</h2>
          <div className="header-right">
            <FaUserCircle size={28} className="profile-icon" />
            <span className="username">{user?.name}</span>
            <FaSignOutAlt
              size={24}
              className="logout-icon"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        </div>

        {/* Main Dashboard */}
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Dashboard</h2>

          {/* Stats Cards */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div className="card">Total <br /> {stats.total}</div>
            <div className="card">Pending <br /> {stats.pending}</div>
            <div className="card">In-Progress <br /> {stats.inProgress}</div>
            <div className="card">Completed <br /> {stats.completed}</div>
            <div className="card">Overdue <br /> {stats.overdue}</div>
          </div>

          {/* New Ticket Button */}
          <div className="table-header">
            <h3>Tickets</h3>
            {user.role === "employee" && (
              <button onClick={() => setShowModal(true)} className="btn-new-ticket">
                + New Ticket
              </button>
            )}
          </div>

          {showModal && (
            <NewTicketModal
              onClose={() => setShowModal(false)}
              onSuccess={(newTicket) => setTickets((prev) => [...prev, newTicket])}
            />
          )}

          {/* Tickets Table */}
          <table className="tickets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                {user.role === "admin" && <th>Created By</th>}
                <th>Assigned To</th>
                <th>Due Date</th>
                {(user.role === "employee" ||user.role === "admin" || user.role === "support") && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  {user.role === "admin" && <td>{ticket.createdBy?.name}</td>}
                  <td>{ticket.assignedTo?.name || "Not Assigned"}</td>
                  <td>{ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : "-"}</td>
                  {(user.role === "employee" ||user.role === "admin" || user.role === "support") && (
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                      {user.role === "admin" && ticket.assignedTo === null && (
                        <button className="btn btn-assign"
                          onClick={() => {
                            setSelectedTicket(ticket._id);
                            setShowAssignModal(true);
                          }}
                        >
                          Assign
                        </button>
                      )}
                      {user.role === "support" && ticket.status !== "closed" && (
                        <button onClick={() => resolve(ticket._id)}>Resolve</button>
                      )}
                    
                  <button onClick={() => handleViewClick(ticket)}>View</button>
                
                </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

        {isViewModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Ticket Details</h2>
        
          <div>
            <h3>{selectedTicket.title}</h3>
            <p><strong>Description:</strong> {selectedTicket.description}</p>
            <p><strong>Status:</strong> {selectedTicket.status}</p>
            <p><strong>Created By:</strong> {selectedTicket.createdBy.name}</p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {selectedTicket.assignedTo ? selectedTicket.assignedTo.name : "Unassigned"}
            </p>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
          </div>
          </div>
        )}
      {/* </Modal> */}
          {/* Assign Modal */}
          {showAssignModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Assign Ticket</h3>
                <select
                  value={selectedSupport}
                  onChange={(e) => setSelectedSupport(e.target.value)}
                >
                  <option value="">Select Support User</option>
                  {supportUsers.map((su) => (
                    <option key={su._id} value={su._id}>
                      {su.name} ({su.email})
                    </option>
                  ))}
                </select>
                <div className="modal-actions">
                  <button onClick={handleAssign}>Assign</button>
                  <button onClick={() => setShowAssignModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
