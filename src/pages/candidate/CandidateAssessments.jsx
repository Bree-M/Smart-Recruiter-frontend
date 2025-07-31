import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/candidate.css/CandidateAssessments.css";

const CandidateAssessments = () => {
  const [assessments] = useState([
    {
      id: 1,
      title: "Frontend Basics",
      description: "Test your knowledge of HTML, CSS, and JavaScript.",
      status: "Pending",
      duration: "1 hour",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Data Structures",
      description: "Assess your understanding of common data structures.",
      status: "Completed",
      duration: "2 hours",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "System Design",
      description: "Design a scalable system architecture.",
      status: "Pending",
      duration: "3 hours",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Backend APIs",
      description: "Build and test RESTful APIs.",
      status: "Pending",
      duration: "1.5 hours",
      difficulty: "Intermediate",
    },
  ]);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [expandedAssessment, setExpandedAssessment] = useState(null);

  const filteredAssessments = assessments
    .filter(
      (assessment) =>
        assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (assessment) => statusFilter === "All" || assessment.status === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return a.status.localeCompare(b.status);
    });

  const handleToggleDetails = (id) => {
    setExpandedAssessment(expandedAssessment === id ? null : id);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setSortBy("title");
    setExpandedAssessment(null);
  };

  return (
    <div className="assessments-page" role="main" aria-label="Candidate Assessments">
      <h2>My Assessments</h2>
      <div className="filters">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or description"
          className="search-input"
          aria-label="Search assessments"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
          aria-label="Filter by status"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
          aria-label="Sort assessments"
        >
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="clear-btn"
          aria-label="Clear filters and sort"
        >
          Clear Filters
        </button>
      </div>
      {isLoading && <p aria-live="polite">Loading assessments...</p>}
      {error && <p aria-live="assertive" className="error-message">{error}</p>}
      {!isLoading && !error && filteredAssessments.length === 0 && (
        <p aria-live="polite">No assessments found.</p>
      )}
      {!isLoading && !error && filteredAssessments.length > 0 && (
        <ul className="assessment-list" role="list">
          {filteredAssessments.map((assessment) => (
            <li className="assessment-card" key={assessment.id} role="listitem">
              <h3>{assessment.title}</h3>
              <p>{assessment.description}</p>
              <p>
                Status: <strong>{assessment.status}</strong>
              </p>
              <button
                onClick={() => handleToggleDetails(assessment.id)}
                className="details-btn"
                aria-expanded={expandedAssessment === assessment.id}
                aria-label={`Toggle details for ${assessment.title}`}
              >
                {expandedAssessment === assessment.id ? "Hide Details" : "Show Details"}
              </button>
              {expandedAssessment === assessment.id && (
                <div className="assessment-details">
                  <p>Duration: {assessment.duration}</p>
                  <p>Difficulty: {assessment.difficulty}</p>
                </div>
              )}
              {assessment.status === "Pending" ? (
                <Link
                  to={`/candidate/take?id=${assessment.id}`}
                  aria-label={`Start ${assessment.title} assessment`}
                >
                  <button className="start-btn">Start</button>
                </Link>
              ) : (
                <button
                  className="view-btn"
                  disabled={assessment.status === "Completed"}
                  aria-disabled={assessment.status === "Completed"}
                >
                  {assessment.status === "Completed" ? "Completed" : "View"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateAssessments;