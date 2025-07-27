import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import '../../styles/RoleSelector.css';

const RoleSelector = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const continueButtonRef = useRef(null);

  // Focus the continue button when a role is selected
  useEffect(() => {
    if (selectedRole && continueButtonRef.current) {
      continueButtonRef.current.focus();
    }
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleContinue = () => {
    if (selectedRole) {
      const params = new URLSearchParams({ role: selectedRole });
      navigate(`/register?${params.toString()}`);
    }
  };

  return (
    <div className="glass-page">
      <div className="glass-container">
        <div className="loader">
          <span className="letter">𝐒</span>
          <span className="letter">𝐦</span>
          <span className="letter">𝐚</span>
          <span className="letter">𝐫</span>
          <span className="letter">𝐭</span>
          <span className="letter">&nbsp;</span>
          <span className="letter">𝐑</span>
          <span className="letter">𝐞</span>
          <span className="letter">𝐜</span>
          <span className="letter">𝐫</span>
          <span className="letter">𝐮</span>
          <span className="letter">𝐢</span>
          <span className="letter">𝐭</span>
          <span className="letter">𝐞</span>
          <span className="letter">𝐫</span>
        </div>

        <div className="radio-group-container">
          <p className="glass-subtitle">
            Choose your role to get started
          </p>

          <label className="radio-label">
            <input
              type="radio"
              className="radio-input"
              name="role"
              value="candidate"
              checked={selectedRole === "candidate"}
              onChange={handleRoleChange}
              aria-labelledby="candidate-text"
            />
            <span className="radio-custom">
              {selectedRole === "candidate" && (
                <span className="radio-custom-inner" />
              )}
            </span>
            <span id="candidate-text" className="radio-text">Candidate</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              className="radio-input"
              name="role"
              value="recruiter"
              checked={selectedRole === "recruiter"}
              onChange={handleRoleChange}
              aria-labelledby="recruiter-text"
            />
            <span className="radio-custom">
              {selectedRole === "recruiter" && (
                <span className="radio-custom-inner" />
              )}
            </span>
            <span id="recruiter-text" className="radio-text">Recruiter</span>
          </label>
        </div>

        <button
          ref={continueButtonRef}
          // Corrected class names to match CSS
          className={`ripple-button ${selectedRole ? "ripple-button-active" : "ripple-button-disabled"}`}
          onClick={handleContinue}
          disabled={!selectedRole}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;