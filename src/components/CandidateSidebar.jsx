import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  ClipboardCheck,
  BarChart,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import "./RecruiterSidebar.css";

const navItems = [
  { path: "/candidate", icon: Home, label: "Dashboard" },
  { path: "/candidate/assessments", icon: FileText, label: "Assessments" },
  { path: "/candidate/take", icon: ClipboardCheck, label: "Take Assessment" },
  { path: "/candidate/results", icon: BarChart, label: "Results" },
];

export default function CandidateSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="recruiter-sidebar">
      <div className="sidebar-brand">
        <h1>Candidate Portal 🧠</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-utility">
        <NavLink
          to="/candidate/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/candidate/help"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <HelpCircle size={20} />
          <span>Help & Docs</span>
        </NavLink>
      </div>

      <div className="sidebar-logout">
        <button onClick={handleLogout} className="sidebar-link">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
