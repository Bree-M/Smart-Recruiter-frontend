import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import ReviewAssessment from "./pages/recruiter/ReviewAssessment";
import ViewResponses from "./pages/recruiter/ViewResponses";
import SendInvitations from "./pages/recruiter/SendInvitations";
import HelpDocs from "./pages/recruiter/HelpDocs";
import Analytics from "./pages/recruiter/Analytics";
import RecruiterLayout from "./layouts/RecruiterLayout";
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
          <Route path="review" element={<ReviewAssessment />} />
          <Route path="invitations" element={<SendInvitations />} />
          <Route path="responses" element={<ViewResponses />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<div>Settings Page Placeholder</div>} />
          <Route path="help" element={<HelpDocs />} />
          <Route path="jobs" element={<div>Jobs Page Placeholder</div>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;