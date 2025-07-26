// src/pages/recruiter/ViewResponses.jsx

import React, { useState, useEffect } from 'react';

const dummyResponses = [
  {
    id: 1,
    candidateName: "Jane Doe",
    email: "jane@example.com",
    score: 85,
    status: "Passed",
    assessmentTitle: "React Developer Test"
  },
  {
    id: 2,
    candidateName: "John Smith",
    email: "john@example.com",
    score: 45,
    status: "Failed",
    assessmentTitle: "React Developer Test"
  },
  {
    id: 3,
    candidateName: "Mary Wanjiru",
    email: "mary@code.com",
    score: null,
    status: "Pending",
    assessmentTitle: "Backend API Assessment"
  }
];

const ViewResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // In real scenario, replace with API call:
    // fetch('/api/responses').then(res => res.json()).then(data => setResponses(data));
    setResponses(dummyResponses);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Candidate Responses</h1>

      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">Candidate</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Assessment</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((resp) => (
              <tr key={resp.id} className="border-t">
                <td className="px-4 py-2">{resp.candidateName}</td>
                <td className="px-4 py-2">{resp.email}</td>
                <td className="px-4 py-2">{resp.assessmentTitle}</td>
                <td className="px-4 py-2">{resp.score !== null ? `${resp.score}%` : '—'}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      resp.status === "Passed"
                        ? "bg-green-200 text-green-800"
                        : resp.status === "Failed"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {resp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {responses.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">No responses yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewResponses;
