import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import RoleSelector from "./pages/Auth/RoleSelector";
import RecruiterLayout from "./layouts/RecruiterLayout";
import IntervieweeLayout from "./layouts/IntervieweeLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import IntervieweeDashboard from "./pages/interviewee/IntervieweeDashboard";
import MyAssessmentsPage from "./pages/interviewee/MyAssessmentsPage";
import ProtectedRoute from "./components/ProtectedRoute";
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
          <Route element={<RecruiterLayout />}>
            <Route path="/recruiter" element={<RecruiterDashboard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
          <Route element={<IntervieweeLayout />}>
            <Route path="/interviewee" element={<IntervieweeDashboard />} />
            <Route path="/interviewee/assessments" element={<MyAssessmentsPage />} />
            <Route path="/interviewee/submissions" element={<h1 style={{color: 'white', margin: 'auto'}}>My Submissions Page (Content Not Yet Implemented)</h1>} />
            <Route path="/interviewee/feedback" element={<h1 style={{color: 'white', margin: 'auto'}}>Feedback Page (Content Not Yet Implemented)</h1>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
);

export default App;