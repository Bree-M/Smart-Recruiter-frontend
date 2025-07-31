import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../../styles/candidate.css/TakeAssessment.css";

const TakeAssessment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const assessmentId = searchParams.get("id");
  const [assessment] = useState({
    id: assessmentId || "1",
    title: "Frontend Basics",
    description: "Test your knowledge of HTML, CSS, and JavaScript.",
    duration: "1 hour",
    difficulty: "Beginner",
    questions: [
      {
        id: 1,
        text: "What is the correct HTML element for the largest heading?",
        options: ["<h6>", "<h1>", "<head>", "<header>"],
        correctAnswer: "<h1>",
      },
      {
        id: 2,
        text: "Which CSS property controls text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: "font-size",
      },
      {
        id: 3,
        text: "What does 'let' do in JavaScript?",
        options: [
          "Declares a block-scoped variable",
          "Declares a global variable",
          "Declares a function",
          "Declares a constant",
        ],
        correctAnswer: "Declares a block-scoped variable",
      },
    ],
  });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) {
      setSubmitted(true);
      setTimeout(() => navigate("/candidate/assessments"), 2000);
    }
  }, [timeLeft, submitted, navigate]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === assessment.questions.length) {
      setShowConfirm(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const confirmSubmission = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/candidate/assessments"), 2000);
  };

  const cancelSubmission = () => {
    setShowConfirm(false);
  };

  const goToPrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(assessment.questions.length - 1, prev + 1)
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (submitted) {
    return (
      <div className="take-assessment-page" role="main" aria-label="Assessment Submission">
        <p aria-live="polite">Assessment submitted! Redirecting...</p>
      </div>
    );
  }

  if (!assessment || !assessment.questions) {
    return (
      <div className="take-assessment-page" role="main" aria-label="Assessment Loading">
        <p aria-live="polite">Loading assessment...</p>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = assessment.questions.length;

  return (
    <div className="take-assessment-page" role="main" aria-label="Take Assessment">
      <h2>{assessment.title}</h2>
      <p>{assessment.description}</p>
      <p>Duration: {assessment.duration}</p>
      <p>Difficulty: {assessment.difficulty}</p>
      <p>Time Left: {formatTime(timeLeft)}</p>
      <p>
        Progress: {answeredQuestions}/{totalQuestions} questions answered
      </p>
      {assessment.questions.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          role="form"
          aria-label="Assessment Questions"
        >
          <div className="question-block" key={currentQuestion.id}>
            <p>
              <strong>
                Q{currentQuestionIndex + 1}: {currentQuestion.text}
              </strong>
            </p>
            {currentQuestion.options.map((opt, i) => (
              <div key={i} className="option">
                <label>
                  <input
                    type="radio"
                    name={`q-${currentQuestion.id}`}
                    value={opt}
                    checked={answers[currentQuestion.id] === opt}
                    onChange={() => handleAnswerChange(currentQuestion.id, opt)}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  />
                  {opt}
                </label>
              </div>
            ))}
          </div>
          <div className="navigation">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
              aria-disabled={currentQuestionIndex === 0}
              className="nav-btn"
              aria-label="Previous question"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goToNext}
              disabled={currentQuestionIndex === assessment.questions.length - 1}
              aria-disabled={currentQuestionIndex === assessment.questions.length - 1}
              className="nav-btn"
              aria-label="Next question"
            >
              Next
            </button>
          </div>
          <button
            type="submit"
            className="submit-btn"
            aria-label="Submit assessment"
          >
            Submit Assessment
          </button>
        </form>
      ) : (
        <p aria-live="polite">No questions available.</p>
      )}
      {showConfirm && (
        <div className="confirmation-modal">
          <p>Are you sure you want to submit the assessment?</p>
          <button
            onClick={confirmSubmission}
            className="confirm-btn"
            aria-label="Confirm submission"
          >
            Confirm
          </button>
          <button
            onClick={cancelSubmission}
            className="cancel-btn"
            aria-label="Cancel submission"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeAssessment;