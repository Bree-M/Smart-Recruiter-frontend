import React from "react";
import "./RoleCard.css";

const RoleCard = ({ role, icon, onSelect, description, isSelected }) => {
  return (
    <div
      className={`role-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(role)}
      role="button"
      aria-label={`Select ${role}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(role);
          e.preventDefault();
        }
      }}
    >
      <div className="icon">{icon}</div>
      <h3>{role}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default RoleCard;