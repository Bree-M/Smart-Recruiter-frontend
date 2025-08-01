import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import ReviewAssessment from "./pages/recruiter/ReviewAssessment";
import ViewResponses from "./pages/recruiter/ViewResponses";
import SendInvitations from "./pages/recruiter/SendInvitations";
import RecruiterHelpDocs from "./pages/recruiter/HelpDocs"; 
import Analytics from "./pages/recruiter/Analytics";
import SettingsPage from "./pages/recruiter/SettingsPage";
import RecruiterLayout from "./layouts/RecruiterLayout";
import CandidateLayout from "./layouts/CandidateLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateAssessments from "./pages/candidate/CandidateAssessments";
import TakeAssessment from "./pages/candidate/TakeAssessment";
import Results from "./pages/candidate/Results";
import CandidateSettingsPage from "./pages/candidate/SettingsPage";
import CandidateHelpDocs from "./pages/candidate/HelpDocs"; 
import "./index.css";
import "./styles/glass-ui.css";

function App() {
  console.log("App is rendering...");

  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/select-role" replace />} />
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
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<RecruiterHelpDocs />} />
          <Route path="jobs" element={<div>Jobs Page Placeholder</div>} />
        </Route>
      </Route>

    
      <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="assessments" element={<CandidateAssessments />} />
          <Route path="take" element={<TakeAssessment />} />
          <Route path="results" element={<Results />} />
          <Route path="settings" element={<CandidateSettingsPage />} />
          <Route path="help" element={<CandidateHelpDocs />} />
        </Route>
      </Route>

      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
