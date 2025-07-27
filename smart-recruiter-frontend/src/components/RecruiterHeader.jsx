// src/components/RecruiterHeader.jsx
import { NavLink } from "react-router-dom";
import { Bell, User, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import "./RecruiterHeader.css"; // 💎 Import the custom CSS

export default function RecruiterHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New assessment submitted by Jane Doe", time: "2 min ago" },
    { id: 2, text: "Interview reminder – Frontend role in 30 min", time: "15 min ago" },
  ];

  return (
    <header className="recruiter-header">
      <h2 className="recruiter-title">Recruiter Dashboard</h2>

      {/* Search bar */}
      <div className="glass-search">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search jobs / assessments / candidates..."
          className="search-input"
        />
      </div>

      {/* Notification bell + dropdown */}
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

      {/* Profile avatar + dropdown */}
      <div className="relative group">
        <button className="profile-btn">
          <User className="w-6 h-6" />
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="glass-dropdown profile-dropdown">
          <NavLink to="/recruiter/profile" className="dropdown-link">
            Profile
          </NavLink>
          <button className="dropdown-link">Account Settings</button>
        </div>
      </div>
    </header>
  );
}
