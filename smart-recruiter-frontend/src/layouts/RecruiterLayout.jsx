import { Outlet } from "react-router-dom";
import RecruiterSidebar from "../components/RecruiterSidebar";
import RecruiterHeader from "../components/RecruiterHeader";

export default function RecruiterLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RecruiterSidebar />
      <div className="flex-1 flex flex-col">
        <RecruiterHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}