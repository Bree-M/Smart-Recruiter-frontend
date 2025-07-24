import { Bell, User, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { createPortal } from 'react-dom';
import "./IntervieweeHeader.css";

export default function IntervieweeHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifications = [
    { id: 1, text: "New assessment invitation: Frontend Skill Test", time: "10 min ago" },
    { id: 2, text: "Your 'React Dev' assessment results are available", time: "2 hours ago" },
  ];

  return (
    <header className="interviewee-header">
      <h2 className="interviewee-title">My Dashboard</h2>

      <div className="glass-search">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search assessments / feedback..."
          className="search-input"
        />
      </div>

      <div className="relative">
        <button
          className="bell-btn"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="notification-dot"></span>
          )}
        </button>

        {showNotifications && (
          <div className="glass-dropdown notifications">
            {notifications.map((n) => (
              <div key={n.id} className="dropdown-item">
                <p className="text-sm">{n.text}</p>
                <p className="text-xs">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <button className="profile-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
          <span className="profile-text">User Name</span>
          <User className="profile-icon w-6 h-6" />
          <ChevronDown className="profile-chevron-icon w-4 h-4" />
        </button>

        {showProfileDropdown && createPortal(
          <div className="glass-dropdown-global profile-dropdown-portal">
            <p className="profile-card-title">Profile</p>
            <button className="dropdown-link account-settings-button">Account Settings</button>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
}