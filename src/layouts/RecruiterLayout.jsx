import React from "react";
import RecruiterSidebar from "../components/RecruiterSidebar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <RecruiterSidebar />

      <main style={{
        flexGrow: 1,
        backgroundColor: "#0e0e0e",
        padding: "2rem",
        color: "#fff",
        overflowY: "auto",
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
