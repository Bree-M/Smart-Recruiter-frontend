import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/SendInvitations.css';

const SendInvitations = () => {
  const [formData, setFormData] = useState({
    job: '',
    assessment: '',
    emails: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.job.trim()) {
      newErrors.job = 'Job selection is required';
    }
    if (!formData.assessment.trim()) {
      newErrors.assessment = 'Assessment selection is required';
    }
    const emailArray = formData.emails.split(',').map(email => email.trim()).filter(Boolean);
    if (emailArray.length === 0) {
      newErrors.emails = 'At least one email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emailArray.filter(email => !emailRegex.test(email));
      if (invalidEmails.length > 0) {
        newErrors.emails = `Invalid email(s): ${invalidEmails.join(', ')}`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const invitationData = {
        ...formData,
        emails: formData.emails.split(',').map(email => email.trim()).filter(Boolean)
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sending invitations:', invitationData);

      toast.success('Invitations sent successfully!');
      setFormData({ job: '', assessment: '', emails: '', message: '' });
      setErrors({});
    } catch {
      toast.error('Failed to send invitations. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <div className="send-invitations-container glass-card">
      <h2 className="send-invitations-title">
        <span role="img" aria-label="envelope">📩</span> Send Invitations
      </h2>

      <form onSubmit={handleSubmit} className="send-invitations-form">
        <div>
          <label htmlFor="job">Select Job:</label>
          <select
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            required
            className={errors.job ? 'invalid' : ''}
            aria-invalid={errors.job ? "true" : "false"}
            aria-describedby={errors.job ? 'job-error' : undefined}
          >
            <option value="">-- Choose Job --</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Designer">Product Designer</option>
          </select>
          {errors.job && <p id="job-error" className="error-message">{errors.job}</p>}
        </div>

        <div>
          <label htmlFor="assessment">Select Assessment:</label>
          <select
            id="assessment"
            name="assessment"
            value={formData.assessment}
            onChange={handleChange}
            required
            className={errors.assessment ? 'invalid' : ''}
            aria-invalid={errors.assessment ? "true" : "false"}
            aria-describedby={errors.assessment ? 'assessment-error' : undefined}
          >
            <option value="">-- Choose Assessment --</option>
            <option value="Frontend Test">Frontend Test</option>
            <option value="Backend Quiz">Backend Quiz</option>
          </select>
          {errors.assessment && <p id="assessment-error" className="error-message">{errors.assessment}</p>}
        </div>

        <div>
          <label htmlFor="emails">Candidate Emails (comma-separated):</label>
          <textarea
            id="emails"
            name="emails"
            value={formData.emails}
            onChange={handleChange}
            required
            rows={4}
            placeholder="e.g. jane@example.com, john@example.com"
            className={errors.emails ? 'invalid' : ''}
            aria-invalid={errors.emails ? "true" : "false"}
            aria-describedby={errors.emails ? 'emails-error' : undefined}
          />
          {errors.emails && <p id="emails-error" className="error-message">{errors.emails}</p>}
        </div>

        <div>
          <label htmlFor="message">Custom Message (optional):</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="You are invited to complete an assessment..."
            className=""
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? (
            <span className="sending-status">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="send-invitations-text">
              <span role="img" aria-label="rocket">🚀</span> Send Invitations
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendInvitations;