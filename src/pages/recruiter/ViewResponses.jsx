import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/ViewResponses.css';

const dummyResponses = [
  {
    id: 1,
    candidateName: 'Jane Doe',
    email: 'jane@example.com',
    score: 85,
    status: 'Passed',
    assessmentTitle: 'React Developer Test',
    answers: [
      { question: 'What is React?', answer: 'A JavaScript library for building UIs' },
      { question: 'Explain useState', answer: 'A hook to manage state in functional components' }
    ]
  },
  {
    id: 2,
    candidateName: 'John Smith',
    email: 'john@example.com',
    score: 45,
    status: 'Failed',
    assessmentTitle: 'React Developer Test',
    answers: [
      { question: 'What is React?', answer: 'A framework' },
      { question: 'Explain useState', answer: 'Not sure' }
    ]
  },
  {
    id: 3,
    candidateName: 'Mary Wanjiru',
    email: 'mary@code.com',
    score: null,
    status: 'Pending',
    assessmentTitle: 'Backend API Assessment',
    answers: []
  }
];

const ViewResponses = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setResponses(dummyResponses);
      setFilteredResponses(dummyResponses);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filterResponses = useCallback(() => {
    let result = responses;
    if (filterStatus !== 'All') {
      result = result.filter(resp => resp.status === filterStatus);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        resp =>
          resp.candidateName.toLowerCase().includes(query) ||
          resp.email.toLowerCase().includes(query)
      );
    }
    setFilteredResponses(result);
  }, [responses, filterStatus, searchQuery]);

  useEffect(() => {
    filterResponses();
  }, [filterResponses]);

  const handleFilterChange = useCallback(e => {
    setFilterStatus(e.target.value);
  }, []);

  const handleSearchChange = useCallback(e => {
    setSearchQuery(e.target.value);
  }, []);

  const handleViewDetails = useCallback(response => {
    setModalResponse(response);
  }, []);

  const closeModal = useCallback(() => {
    setModalResponse(null);
  }, []);

  const handleExport = useCallback(() => {
    const csvContent = [
      ['Candidate', 'Email', 'Assessment', 'Score', 'Status'],
      ...filteredResponses.map(resp => [
        resp.candidateName,
        resp.email,
        resp.assessmentTitle,
        resp.score !== null ? `${resp.score}%` : '—',
        resp.status
      ])
    ]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'candidate_responses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Responses exported successfully!');
  }, [filteredResponses]);

  const summaryStats = {
    total: responses.length,
    passed: responses.filter(resp => resp.status === 'Passed').length,
    failed: responses.filter(resp => resp.status === 'Failed').length,
    pending: responses.filter(resp => resp.status === 'Pending').length
  };

  return (
    <div className="view-responses-wrapper">
      <h1 className="view-responses-title">Candidate Responses</h1>

      <div className="glass-panel">
        <h2>Summary</h2>
        <div className="summary-grid">
          <div className="summary-stat-card">
            <h3>Total Responses</h3>
            <p>{summaryStats.total}</p>
          </div>
          <div className="summary-stat-card">
            <h3>Passed</h3>
            <p>{summaryStats.passed}</p>
          </div>
          <div className="summary-stat-card">
            <h3>Failed</h3>
            <p>{summaryStats.failed}</p>
          </div>
          <div className="summary-stat-card">
            <h3>Pending</h3>
            <p>{summaryStats.pending}</p>
          </div>
        </div>
      </div>

      <div className="controls-panel glass-panel">
        <div className="form-control-group select-wrapper">
          <label htmlFor="filter">Filter by Status</label>
          <select
            id="filter"
            value={filterStatus}
            onChange={handleFilterChange}
            aria-label="Filter responses by status"
            className="select-field"
          >
            <option value="All">All</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="form-control-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name or email"
            aria-label="Search candidates"
            className="input-field"
          />
        </div>

        <div className="form-control-group">
          <button type="button" onClick={handleExport} className="action-button">
            Export as CSV
          </button>
        </div>
      </div>

      <div className="responses-table-panel glass-panel">
        {isLoading ? (
          <p className="info-message">Loading responses...</p>
        ) : (
          <>
            {filteredResponses.length > 0 ? (
              <table className="responses-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Email</th>
                    <th>Assessment</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponses.map(resp => (
                    <tr key={resp.id}>
                      <td>{resp.candidateName}</td>
                      <td>{resp.email}</td>
                      <td>{resp.assessmentTitle}</td>
                      <td>{resp.score !== null ? `${resp.score}%` : '—'}</td>
                      <td className={`status-${resp.status.toLowerCase()}`}>{resp.status}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleViewDetails(resp)}
                          aria-label={`View details for ${resp.candidateName}`}
                          className="action-button-small"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="info-message">No responses found matching your criteria.</p>
            )}
          </>
        )}
      </div>

      {modalResponse && (
        <div className="modal-overlay" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-header">
              <h2 id="modal-title" className="modal-title">
                {modalResponse.candidateName} - {modalResponse.assessmentTitle}
              </h2>
            </div>
            <div className="modal-body">
              <p><strong>Email:</strong> {modalResponse.email}</p>
              <p><strong>Score:</strong> {modalResponse.score !== null ? `${modalResponse.score}%` : '—'}</p>
              <p><strong>Status:</strong> {modalResponse.status}</p>

              <h3 className="modal-section-title">Answers</h3>
              {modalResponse.answers.length > 0 ? (
                <ul className="answer-list">
                  {modalResponse.answers.map((answer, index) => (
                    <li key={index} className="answer-item">
                      <p><strong>Question:</strong> {answer.question}</p>
                      <p><strong>Answer:</strong> {answer.answer}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No answers available for this assessment.</p>
              )}
              <button type="button" onClick={closeModal} aria-label="Close modal" className="modal-close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewResponses;