// src/pages/recruiter/SendInvitations.jsx

import React, { useState } from 'react';

const SendInvitations = () => {
  const [emails, setEmails] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [message, setMessage] = useState('');

  const handleSendInvites = (e) => {
    e.preventDefault();
    const emailList = emails.split(',').map(email => email.trim());

    console.log('Sending invitations to:', emailList);
    console.log('Assessment ID:', assessmentId);

    // Example API call placeholder:
    // fetch('/api/send-invitations', { method: 'POST', body: JSON.stringify({ emailList, assessmentId }) })

    setMessage(`Invitations sent to ${emailList.length} candidate(s).`);
    setEmails('');
    setAssessmentId('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Send Assessment Invitations</h1>

      <form onSubmit={handleSendInvites} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="emails" className="block text-gray-700 font-semibold mb-2">
            Candidate Emails (comma separated):
          </label>
          <textarea
            id="emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows="4"
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g. jane@example.com, john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="assessmentId" className="block text-gray-700 font-semibold mb-2">
            Assessment ID or Title:
          </label>
          <input
            type="text"
            id="assessmentId"
            value={assessmentId}
            onChange={(e) => setAssessmentId(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g. 12345 or React Developer Test"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded"
        >
          Send Invitations
        </button>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default SendInvitations;