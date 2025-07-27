import { Outlet } from "react-router-dom";
import IntervieweeSidebar from "../components/IntervieweeSidebar";
import IntervieweeHeader from "../components/IntervieweeHeader";
import "./IntervieweeLayout.css";

export default function IntervieweeLayout() {
  return (
    <div id="interviewee-grid-layout-container" className="grid h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <IntervieweeSidebar />

      <div id="right-content-panel" className="flex flex-col flex-1 min-h-0">
        
        <header id="header-top-bar" className="p-4">
          <IntervieweeHeader />
        </header>

        <main id="main-view-area" className="flex-1 flex justify-center items-center overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}