import React from 'react';
import "../../styles/ReviewAssessment.css";


const ReviewAssessment = () => {
  const mockAssessment = {
    title: 'Junior React Developer Assessment',
    description: 'A basic assessment to evaluate React fundamentals.',
    questions: [
      {
        id: 1,
        type: 'MCQ',
        content: 'What is JSX in React?',
        options: ['A templating engine', 'A file format', 'A syntax extension for JavaScript', 'None'],
        answer: 'A syntax extension for JavaScript',
      },
      {
        id: 2,
        type: 'Subjective',
        content: 'Explain the Virtual DOM in your own words.',
        answer: 'Recruiter will review answer manually.',
      },
      {
        id: 3,
        type: 'Coding',
        content: 'Write a function in JavaScript to reverse a string.',
        answer: 'function reverse(str) { return str.split("").reverse().join(""); }',
      },
    ],
  };

  const handlePublish = () => {
    alert("Assessment published (stub)!");
  };

  return (
    <div className="review-container">
      <h1 className="review-heading">Review & Publish</h1>

      <div className="assessment-details">
        <h2 className="assessment-title">{mockAssessment.title}</h2>
        <p className="assessment-description">{mockAssessment.description}</p>
      </div>

      <div>
        {mockAssessment.questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <p className="question-meta">Question {index + 1} ({q.type})</p>
            <p className="question-text">{q.content}</p>

            {q.type === 'MCQ' && (
              <ul className="options-list">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}

            <p className="answer-highlight">
              <strong>Answer:</strong> {q.answer}
            </p>
          </div>
        ))}
      </div>

      <button onClick={handlePublish} className="review-publish-button">
        Publish Assessment
      </button>
    </div>
  );
};

export default ReviewAssessment;
