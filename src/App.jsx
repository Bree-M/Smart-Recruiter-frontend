import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";
import RecruiterLayout from "./layouts/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import ReviewAssessment from "./pages/recruiter/ReviewAssessment";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import "./styles/glass-ui.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/select-role" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/select-role" element={<RoleSelector />} />

      <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="create" element={<CreateAssessment />} />
          <Route path="jobs" element={<div>Jobs Page Placeholder</div>} />
          <Route path="invitations" element={<div>Invitations Page Placeholder</div>} />
          <Route path="responses" element={<div>Responses Page Placeholder</div>} />
          <Route path="analytics" element={<div>Analytics Page Placeholder</div>} />
          <Route path="settings" element={<div>Settings Page Placeholder</div>} />
          <Route path="help" element={<div>Help & Docs Page Placeholder</div>} />
          <Route path="review" element={<ReviewAssessment />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
