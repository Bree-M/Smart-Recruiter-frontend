import React from 'react';
import AssessmentCard from '../../components/AssessmentCard';
import './MyAssessmentsPage.css'; // New CSS import

export default function MyAssessmentsPage() {
  const mockAssessments = [
    {
      id: 'a1',
      title: 'Find Intersection',
      difficulty: 'Easy',
      solutions: '103095',
      maxScore: 10,
      description: 'For this assessment you will be manipulating an array.',
    },
    {
      id: 'a2',
      title: 'First Reverse',
      difficulty: 'Easy',
      solutions: '394842',
      maxScore: 10,
      description: 'For this assessment you will be reversing a string.',
    },
    {
      id: 'a3',
      title: 'Longest Word',
      difficulty: 'Easy',
      solutions: '345020',
      maxScore: 10,
      description: 'For this assessment you will be determining the largest word in a string.',
    },
  ];

  return (
    <div className="my-assessments-page-container">
      <h3 className="my-assessments-title glass-title">Available Assessments</h3>
      <div className="assessment-cards-grid">
        {mockAssessments.map(assessment => (
          <AssessmentCard key={assessment.id} assessment={assessment} />
        ))}
      </div>
    </div>
  );
}