import { Outlet } from "react-router-dom";
import IntervieweeSidebar from "../components/IntervieweeSidebar";
import IntervieweeHeader from "../components/IntervieweeHeader";

export default function IntervieweeLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <IntervieweeSidebar />
      <div className="flex-1 flex flex-col">
        <IntervieweeHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}