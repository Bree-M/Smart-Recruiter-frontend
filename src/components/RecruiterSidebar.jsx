// src/components/RecruiterSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  FilePlus,
  Send,
  BarChart2,
  LogOut,
  Settings,
  HelpCircle,
  Briefcase,
  Users,
} from "lucide-react";
import "./RecruiterSidebar.css"; // 💎 Import the liquid-glass style

const nav = [
  { path: "/recruiter", icon: Home, label: "Dashboard" },
  { path: "/recruiter/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/recruiter/create", icon: FilePlus, label: "Create Assessment" },
  { path: "/recruiter/invitations", icon: Send, label: "Invitations" },
  { path: "/recruiter/responses", icon: Users, label: "Responses" },
  { path: "/recruiter/analytics", icon: BarChart2, label: "Analytics" },
];

export default function RecruiterSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="recruiter-sidebar">
      <div className="sidebar-brand">
        <h1>Smart Recruiter 👋</h1>
      </div>

      <nav className="sidebar-nav">
        {nav.map((n) => (
          <NavLink
            key={n.path}
            to={n.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <n.icon size={20} />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-utility">
        <NavLink to="/recruiter/settings" className="sidebar-link">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/recruiter/help" className="sidebar-link">
          <HelpCircle size={20} />
          <span>Help & Docs</span>
        </NavLink>
      </div>

      <div className="sidebar-logout">
        <button onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
