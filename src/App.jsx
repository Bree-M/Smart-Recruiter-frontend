import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import ReviewAssessment from "./pages/recruiter/ReviewAssessment";
import ViewResponses from "./pages/recruiter/ViewResponses";
import HelpDocs from "./pages/recruiter/HelpDocs"; // ✅ HelpDocs page

// Layout & Components
import RecruiterLayout from "./layouts/RecruiterLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Global Styles
import "./index.css";
import "./styles/glass-ui.css";

const App = () => (
  <Router>
    <Routes>
      {/* Redirect root to role selector */}
      <Route path="/" element={<Navigate to="/select-role" />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/select-role" element={<RoleSelector />} />

      {/* Recruiter Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="create" element={<CreateAssessment />} />
          <Route path="review" element={<ReviewAssessment />} />
          <Route path="invitations" element={<div>Invitations Page Placeholder</div>} />
          <Route path="responses" element={<ViewResponses />} />
          <Route path="analytics" element={<div>Analytics Page Placeholder</div>} />
          <Route path="settings" element={<div>Settings Page Placeholder</div>} />
          <Route path="help" element={<HelpDocs />} /> {/* ✅ Renders HelpDocs component */}
          <Route path="jobs" element={<div>Jobs Page Placeholder</div>} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
