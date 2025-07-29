import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ClipboardCheck, BarChart, User, Clock } from "lucide-react";
import "../../styles/candidate.css/CandidateDashboard.css";

const CandidateDashboard = () => {
  const [candidate, setCandidate] = useState({
    name: "Dancan Morara",
    email: "can@gmail.com",
    completedAssessments: 3,
    pendingAssessments: 2,
    recentActivity: [
      { id: 1, action: "Completed Assessment: Frontend Basics", date: "2025-07-27" },
      { id: 2, action: "Started Assessment: Data Structures", date: "2025-07-26" },
    ],
    upcomingDeadlines: [
      { id: 1, title: "Backend Coding Challenge", dueDate: "2025-07-30" },
      { id: 2, title: "System Design Test", dueDate: "2025-08-01" },
    ],
  });

  useEffect(() => {
  }, []);

  return (
    <div className="candidate-dashboard" role="main" aria-label="Candidate Dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {candidate.name} 🧠</h1>
          <p className="dashboard-subtitle">
            Your hub for assessments, results, and profile management.
          </p>
        </div>
        <Link to="/candidate/settings" className="profile-link" aria-label="Profile Settings">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </header>

      <section className="stats-grid" aria-label="Assessment Statistics">
        <div className="stat-card">
          <div className="stat-content">
            <FileText className="stat-icon" size={24} />
            <div>
              <p className="stat-value">{candidate.pendingAssessments}</p>
              <p className="stat-label">Pending Assessments</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <ClipboardCheck className="stat-icon" size={24} />
            <div>
              <p className="stat-value">{candidate.completedAssessments}</p>
              <p className="stat-label">Completed Assessments</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <Link to="/candidate/results" className="stat-content" aria-label="View Results">
            <BarChart className="stat-icon" size={24} />
            <div>
              <p className="stat-value">
                {candidate.completedAssessments > 0 ? "Available" : "None"}
              </p>
              <p className="stat-label">View Results</p>
            </div>
          </Link>
        </div>

        <div className="stat-card">
          <Link to="/candidate/assessments" className="stat-content" aria-label="Take Assessment">
            <FileText className="stat-icon" size={24} />
            <div>
              <p className="stat-value">Start Now</p>
              <p className="stat-label">Take Assessment</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="activity-grid" aria-label="Activity and Deadlines">
        <div className="activity-card">
          <h2 className="card-title">Recent Activity</h2>
          {candidate.recentActivity.length > 0 ? (
            <ul className="activity-list">
              {candidate.recentActivity.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <Clock className="activity-icon" size={18} />
                  <div>
                    <p className="activity-text">{activity.action}</p>
                    <p className="activity-date">{activity.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No recent activity.</p>
          )}
          <Link to="/candidate/results" className="view-more-link">
            View All Activity
          </Link>
        </div>

        <div className="activity-card">
          <h2 className="card-title">Upcoming Deadlines</h2>
          {candidate.upcomingDeadlines.length > 0 ? (
            <ul className="activity-list">
              {candidate.upcomingDeadlines.map((deadline) => (
                <li key={deadline.id} className="activity-item">
                  <Clock className="activity-icon" size={18} />
                  <div>
                    <p className="activity-text">{deadline.title}</p>
                    <p className="activity-date">Due: {deadline.dueDate}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No upcoming deadlines.</p>
          )}
          <Link to="/candidate/assessments" className="view-more-link">
            View All Assessments
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CandidateDashboard;