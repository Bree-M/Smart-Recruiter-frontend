import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");
  return token && allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" replace />;
}