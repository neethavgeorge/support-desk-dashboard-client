import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Reports = () => {
  const { token } = useAuth();
  const [report, setReport] = useState(null);
  

  useEffect(() => {
    if (!token) return;
    axios
      .get("https://support-desk-dashboard-server.onrender.com/api/reports/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReport(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  if (!report) return <p>Loading report...</p>;

 return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* ✅ Reusable Header */}
        <Header />
<div style={{ flex: 1, padding: "20px" }}>
          <h2>Statistics Report</h2><br></br>
      <ul>
        <li>Total Tickets: {report.total}</li>
        <li>Pending: {report.pending}</li>
        <li>In Progress: {report.inProgress}</li>
        <li>Closed: {report.closed}</li>
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Reports;
