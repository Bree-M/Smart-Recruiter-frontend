import React from 'react';
import './IntervieweeDashboard.css';

export default function IntervieweeDashboard() {
  return (
    <div className="interviewee-dashboard-layout-container">
      <div className="glass-card interviewee-dashboard-welcome-content">
        <div className="glass-blur" />
        <h2 className="glass-title">Welcome to your Interviewee Dashboard!</h2>
        <p className="glass-subtitle">You can see your upcoming assessments, submissions, and feedback here.</p>
      </div>
    </div>
  );
}