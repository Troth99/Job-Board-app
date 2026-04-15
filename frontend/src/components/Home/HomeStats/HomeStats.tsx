import { useEffect } from "react";
import "./HomeStats.css";
import { StatsResponse } from "../../../interfaces/ApplicationStatistic.model";



export function HomeStats({ statistics }: { statistics: StatsResponse | null }) {

//To do if there are over 1000 jobs, users or companies to show 1k+ instead of the exact number o with 100 etc
  return (
<div className="stats-section">
  <h2 className="stats-title">Platform Statistics</h2>
  <p className="stats-desc">Here you can see an overview of the activity on our platform.</p>
  <div className="home-stats-container">
    <div className="stat-card">
      <div className="stat-value">{statistics?.jobsCount}</div>
      <div className="stat-label">Jobs</div>
      <div className="stat-info">Total job postings</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">{statistics?.usersCount}</div>
      <div className="stat-label">Users</div>
      <div className="stat-info">Registered users on the platform</div>
    </div>
    <div className="stat-card">
      <div className="stat-value">{statistics?.companiesCount}</div>
      <div className="stat-label">Companies</div>
      <div className="stat-info">Active companies posting jobs</div>
    </div>
  </div>
</div>
  );
}
