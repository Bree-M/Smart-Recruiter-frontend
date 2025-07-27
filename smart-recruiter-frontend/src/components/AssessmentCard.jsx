import React from 'react';
import './AssessmentCard.css';

export default function AssessmentCard({ assessment }) {
  return (
    <div className="assessment-card">
      <div className="card-glass-blur" />
      <h4 className="assessment-info-title">Assessment Information</h4>
      <div className="assessment-details">
        <p><span className="detail-label">Title:</span> {assessment.title}</p>
        <p><span className="detail-label">Difficulty:</span> {assessment.difficulty}</p>
        <p><span className="detail-label">Solutions:</span> {assessment.solutions}</p>
        <p><span className="detail-label">Maximum Score:</span> {assessment.maxScore}</p>
        <p><span className="detail-label">Description:</span> {assessment.description}</p>
      </div>
      <button className="begin-challenge-button">
        BEGIN CHALLENGE <span className="arrow">→</span>
      </button>
    </div>
  );
}