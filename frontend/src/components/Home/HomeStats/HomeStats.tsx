import { useEffect } from "react";
import "./HomeStats.css";



export function HomeStats() {


  return (
<div className="stats-section">
  <h2 className="stats-title">Platform Statistics</h2>
  <p className="stats-desc">Here you can see an overview of the activity on our platform.</p>
  <div className="home-stats-container">
    <div className="stat-card">
      <div className="stat-value">120</div>
      <div className="stat-label">Jobs</div>
      <div className="stat-info">Total job postings</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">350</div>
      <div className="stat-label">Users</div>
      <div className="stat-info">Registered users on the platform</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">42</div>
      <div className="stat-label">Companies</div>
      <div className="stat-info">Active companies posting jobs</div>
    </div>
  </div>
</div>
  );
}
