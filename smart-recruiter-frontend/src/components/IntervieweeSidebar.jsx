import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Clock,
  MessageSquare,
  LogOut,
  Settings,
  HelpCircle,
  Award,
} from "lucide-react";
import "./IntervieweeSidebar.css";

const nav = [
  { path: "/interviewee", icon: Home, label: "Dashboard" },
  { path: "/interviewee/assessments", icon: FileText, label: "My Assessments" },
  { path: "/interviewee/submissions", icon: Award, label: "My Submissions" },
  { path: "/interviewee/feedback", icon: MessageSquare, label: "Feedback" },
];

export default function IntervieweeSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="interviewee-sidebar">
      <div className="sidebar-brand">
        <h1>Smart Interviewee 👋</h1>
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
        <NavLink to="/interviewee/settings" className="sidebar-link">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/interviewee/help" className="sidebar-link">
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