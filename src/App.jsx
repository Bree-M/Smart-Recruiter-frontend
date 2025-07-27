import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";

// Recruiter Pages (from main)
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import ReviewAssessment from "./pages/recruiter/ReviewAssessment";
import ViewResponses from "./pages/recruiter/ViewResponses";
import HelpDocs from "./pages/recruiter/HelpDocs";

// Interviewee Pages (from your branch)
import IntervieweeDashboard from "./pages/interviewee/IntervieweeDashboard";
import MyAssessmentsPage from "./pages/interviewee/MyAssessmentsPage";

// Layouts & Components
import RecruiterLayout from "./layouts/RecruiterLayout";
import IntervieweeLayout from "./layouts/IntervieweeLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Global Styles
import "./index.css";
import "./styles/glass-ui.css";

const App = () => (
  <Router>
    <div id="main-app-container" className="h-screen overflow-hidden">
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
            <Route path="invitations" element={<div>Invitations Page Placeholder</div>} />
            <Route path="responses" element={<ViewResponses />} />
            <Route path="analytics" element={<div>Analytics Page Placeholder</div>} />
            <Route path="settings" element={<div>Settings Page Placeholder</div>} />
            <Route path="help" element={<HelpDocs />} />
            <Route path="jobs" element={<div>Jobs Page Placeholder</div>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
          <Route path="/interviewee" element={<IntervieweeLayout />}>
            <Route index element={<IntervieweeDashboard />} />
            <Route path="assessments" element={<MyAssessmentsPage />} />
            <Route path="submissions" element={<h1 style={{color: 'white', margin: 'auto'}}>My Submissions Page</h1>} />
            <Route path="feedback" element={<h1 style={{color: 'white', margin: 'auto'}}>Feedback Page</h1>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
);

export default App;