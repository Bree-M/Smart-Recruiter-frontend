import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Correct relative path to component-specific CSS
import '../../styles/CreateAssessment.css';

// ✅ Import the global/shared glassmorphism styles
import '../../styles/glass-ui.css';


const CreateAssessment = () => {
  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    questions: [],
  });

  const [errors, setErrors] = useState({});

  const generateId = useCallback(() => crypto.randomUUID(), []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!assessment.title.trim()) {
      newErrors.title = 'Assessment title is required';
    }
    if (assessment.questions.length === 0) {
      newErrors.questions = 'At least one question is required';
    }
    assessment.questions.forEach((q, idx) => {
      if (!q.content.trim()) {
        newErrors[`question_${idx}`] = `Question ${idx + 1} content is required`;
      }
      if (q.type === 'MCQ' && q.options.some(opt => !opt.trim())) {
        newErrors[`options_${idx}`] = `All options for Question ${idx + 1} must be filled`;
      }
      // For MCQ, answer must be one of the options or filled
      if (q.type === 'MCQ' && q.answer.trim() && !q.options.includes(q.answer.trim())) {
        newErrors[`answer_${idx}`] = `Answer for Question ${idx + 1} must match one of the options.`;
      } else if (!q.answer.trim()) {
        newErrors[`answer_${idx}`] = `Answer for Question ${idx + 1} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [assessment]);

  const addQuestion = useCallback((type) => {
    const newQuestion = {
      id: generateId(),
      type,
      content: '',
      options: type === 'MCQ' ? ['', ''] : [],
      answer: '',
    };
    setAssessment(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setErrors({});
  }, [generateId]);

  const updateQuestionContent = useCallback((id, content) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === id ? { ...q, content } : q
      ),
    }));
  }, []);

  const updateOption = useCallback((id, optionIndex, value) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === id) {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = value;
          return { ...q, options: updatedOptions };
        }
        return q;
      }),
    }));
  }, []);

  const addOption = useCallback((id) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === id ? { ...q, options: [...q.options, ''] } : q
      ),
    }));
  }, []);

  const removeOption = useCallback((id, optionIndex) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === id && q.options.length > 2) {
          const updatedOptions = [...q.options];
          updatedOptions.splice(optionIndex, 1);
          return { ...q, options: updatedOptions };
        }
        return q;
      }),
    }));
  }, []);

  const updateAnswer = useCallback((id, answer) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => (q.id === id ? { ...q, answer } : q)),
    }));
  }, []);

  const deleteQuestion = useCallback((id) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }
    console.log('Submitting assessment:', assessment);
    toast.success('Assessment created successfully!');
    setAssessment({ title: '', description: '', questions: [] });
    setErrors({});
  }, [assessment, validateForm]);

  return (
    // Use the global glass-page for alignment and background if desired, or just create-assessment-container
    <div className="glass-page">
      {/* Apply glass-card and component-specific container styles */}
      <div className="glass-card create-assessment-container">
        {/* Use glass-title for the main heading */}
        <h2 className="glass-title">Create New Assessment</h2>

        <form onSubmit={handleSubmit} className="glass-form create-assessment-form">
          {/* Assessment Title */}
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={assessment.title}
              onChange={(e) => setAssessment(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Frontend Developer Test"
              required
              className={errors.title ? 'invalid' : ''}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          {/* Assessment Description */}
          <div>
            <label>Description:</label>
            <textarea
              value={assessment.description}
              onChange={(e) => setAssessment(prev => ({ ...prev, description: e.target.value }))}
              rows="3"
              placeholder="Brief summary of this assessment"
            />
          </div>

          {/* Questions Section */}
          <div className="form-section-divider">
            <h2 className="section-title">Questions</h2>
            {errors.questions && <p className="error-message">{errors.questions}</p>}
            {assessment.questions.length === 0 && (
              <p className="empty-questions-message">No questions added yet.</p>
            )}

            {assessment.questions.map((q, index) => (
              <div key={q.id} className="question-card">
                <div className="question-card-header">
                  <p>Question {index + 1} - {q.type}</p>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(q.id)}
                    className="remove-question-button"
                  >
                    Remove
                  </button>
                </div>

                {/* Question Content */}
                <input
                  type="text"
                  value={q.content}
                  onChange={(e) => updateQuestionContent(q.id, e.target.value)}
                  placeholder="Enter question content"
                  className={errors[`question_${index}`] ? 'invalid' : ''}
                />
                {errors[`question_${index}`] && (
                  <p className="error-message">{errors[`question_${index}`]}</p>
                )}

                {/* MCQ Options */}
                {q.type === 'MCQ' && (
                  <div className="mcq-options-container">
                    <label>Options:</label>
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="mcq-option-item">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(q.id, idx, e.target.value)}
                          placeholder={`Option ${idx + 1}`}
                          className={errors[`options_${index}`] ? 'invalid' : ''}
                        />
                        {q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(q.id, idx)}
                            className="remove-option-button"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                    {errors[`options_${index}`] && (
                      <p className="error-message">{errors[`options_${index}`]}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => addOption(q.id)}
                      className="add-option-button"
                    >
                      + Add Option
                    </button>

                    <div style={{ marginTop: '1rem' }}>
                      <label>Correct Answer:</label>
                      <input
                        type="text"
                        value={q.answer}
                        onChange={(e) => updateAnswer(q.id, e.target.value)}
                        placeholder="Enter correct option text"
                        className={errors[`answer_${index}`] ? 'invalid' : ''}
                      />
                      {errors[`answer_${index}`] && (
                        <p className="error-message">{errors[`answer_${index}`]}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Subjective / Coding */}
                {(q.type === 'Subjective' || q.type === 'Coding') && (
                  <div style={{ marginTop: '1rem' }}>
                    <label>Expected Answer:</label>
                    <textarea
                      value={q.answer}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      rows="3"
                      placeholder="Describe the expected answer..."
                      className={errors[`answer_${index}`] ? 'invalid' : ''}
                    />
                    {errors[`answer_${index}`] && (
                      <p className="error-message">{errors[`answer_${index}`]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Question Buttons */}
          <div className="form-section-divider">
            <label>Add Question:</label>
            <div className="add-question-buttons">
              <button
                type="button"
                onClick={() => addQuestion('MCQ')}
                className="glass-button mcq"
              >
                + MCQ
              </button>
              <button
                type="button"
                onClick={() => addQuestion('Subjective')}
                className="glass-button subjective"
              >
                + Subjective
              </button>
              <button
                type="button"
                onClick={() => addQuestion('Coding')}
                className="glass-button coding"
              >
                + Coding
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="glass-button primary submit-button">
            Create Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;