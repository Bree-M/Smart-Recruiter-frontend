import React from "react";
import "./RoleCard.css"; // Ensure this import points to your CSS file

const RoleCard = ({ role, icon, onSelect, description, isSelected }) => {
  return (
    <div
      className={`role-card ${isSelected ? 'selected' : ''}`} // Apply 'selected' class conditionally
      onClick={() => onSelect(role)}
      role="button"
      aria-label={`Select ${role}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { // Added spacebar for accessibility
          onSelect(role);
          e.preventDefault(); // Prevent default scroll behavior for spacebar
        }
      }}
    >
      {/* Icon, heading, and paragraph will now be styled solely by RoleCard.css */}
      <div className="icon">{icon}</div> {/* Class for icon styling */}
      <h3>{role}</h3> {/* Changed to h3 for semantic hierarchy */}
      {description && <p>{description}</p>} {/* Class for paragraph styling */}
    </div>
  );
};

export default RoleCard;