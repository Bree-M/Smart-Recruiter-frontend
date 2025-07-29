import React from "react";
import { Outlet } from "react-router-dom";
import CandidateSidebar from "../components/CandidateSidebar"; 

const CandidateLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <CandidateSidebar />

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

export default CandidateLayout;