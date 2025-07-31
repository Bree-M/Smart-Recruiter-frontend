import React, { useState } from "react";
import "../../styles/candidate.css/Results.css";

const Results = () => {
  const [assessments] = useState([
    {
      id: 1,
      title: "Frontend Basics",
      description: "Test your knowledge of HTML, CSS, and JavaScript.",
      status: "Completed",
      duration: "1 hour",
      difficulty: "Beginner",
      score: 85,
      questions: [
        {
          id: 1,
          text: "What is the correct HTML element for the largest heading?",
          answer: "<h1>",
        },
        {
          id: 2,
          text: "Which CSS property controls text size?",
          answer: "font-size",
        },
      ],
    },
    {
      id: 2,
      title: "Data Structures",
      description: "Assess your understanding of common data structures.",
      status: "Completed",
      duration: "2 hours",
      difficulty: "Intermediate",
      score: 92,
      questions: [
        {
          id: 1,
          text: "What is the time complexity of a binary search?",
          answer: "O(log n)",
        },
        {
          id: 2,
          text: "Which data structure uses LIFO?",
          answer: "Stack",
        },
      ],
    },
  ]);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [expandedResult, setExpandedResult] = useState(null);

  const filteredAssessments = assessments
    .filter(
      (assessment) =>
        assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (assessment) =>
        difficultyFilter === "All" || assessment.difficulty === difficultyFilter
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return b.score - a.score;
    });

  const handleToggleDetails = (id) => {
    setExpandedResult(expandedResult === id ? null : id);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("All");
    setSortBy("title");
    setExpandedResult(null);
  };

  return (
    <div className="results-page" role="main" aria-label="Assessment Results">
      <h2>Your Assessment Results</h2>
      <div className="filters">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or description"
          className="search-input"
          aria-label="Search results"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="difficulty-filter"
          aria-label="Filter by difficulty"
        >
          <option value="All">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
          aria-label="Sort results"
        >
          <option value="title">Sort by Title</option>
          <option value="score">Sort by Score</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="clear-btn"
          aria-label="Clear filters and sort"
        >
          Clear Filters
        </button>
      </div>
      {isLoading && <p aria-live="polite">Loading results...</p>}
      {error && <p aria-live="assertive" className="error-message">{error}</p>}
      {!isLoading && !error && filteredAssessments.length === 0 && (
        <p aria-live="polite">No completed assessments found.</p>
      )}
      {!isLoading && !error && filteredAssessments.length > 0 && (
        <ul className="result-list" role="list">
          {filteredAssessments.map((assessment) => (
            <li className="result-card" key={assessment.id} role="listitem">
              <h3>{assessment.title}</h3>
              <p>{assessment.description}</p>
              <p>
                Status: <strong>{assessment.status}</strong>
              </p>
              <button
                onClick={() => handleToggleDetails(assessment.id)}
                className="details-btn"
                aria-expanded={expandedResult === assessment.id}
                aria-label={`Toggle details for ${assessment.title}`}
              >
                {expandedResult === assessment.id ? "Hide Details" : "Show Details"}
              </button>
              {expandedResult === assessment.id && (
                <div className="result-details">
                  <p>Duration: {assessment.duration}</p>
                  <p>Difficulty: {assessment.difficulty}</p>
                  <p>Score: {assessment.score}%</p>
                </div>
              )}
              <p>Your Answers:</p>
              <ul className="answer-list" role="list">
                {assessment.questions.map((question) => (
                  <li key={question.id} role="listitem">
                    <p>{question.text}</p>
                    <p>
                      Answer: <strong>{question.answer || "N/A"}</strong>
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;