import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "../../styles/RecruiterDashboard.css";

const RecruiterDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const stats = [
    { label: "Jobs Posted", value: 24 },
    { label: "Assessments Created", value: 12 },
    { label: "Candidates Invited", value: 87 },
    { label: "Interviews Scheduled", value: 9 },
  ];

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      Chart.defaults.color = isDarkMode ? "#c0c0c0" : "#6b7280";
      Chart.defaults.borderColor = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Candidate Activity",
              data: [65, 59, 80, 81, 56, 55, 40],
              borderColor: "#FFD700",
              backgroundColor: isDarkMode ? "rgba(255, 215, 0, 0.15)" : "rgba(255, 215, 0, 0.3)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#FFD700",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#FFD700",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: isDarkMode ? "#FFE033" : "#FFD700",
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              backgroundColor: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
              titleColor: isDarkMode ? "#FFE033" : "#FFD700",
              bodyColor: isDarkMode ? "#dcdcdc" : "#333",
              borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              ticks: { color: isDarkMode ? "#a0a0a0" : "#4b5563" },
              grid: { color: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
            },
            y: {
              beginAtZero: true,
              ticks: { color: isDarkMode ? "#a0a0a0" : "#4b5563" },
              grid: { color: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    document.documentElement.classList.toggle("dark", newDarkModeState);
  };

  const handleQuickAction = (action) => {
    alert(`Performing action: ${action}`);
  };

  return (
    <div className="recruiter-dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">👋 Welcome back, Recruiter!</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map(({ label, value }) => (
          <div key={label} className="dashboard-panel stat-card">
            <h2>{label}</h2>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-panel chart-panel">
          <h2>📊 Candidate Activity</h2>
          <div className="chart-canvas-container">
            <canvas ref={chartRef} />
          </div>
        </div>

        <div className="dashboard-panel tips-panel">
          <h2>💡 Tips for Recruiters</h2>
          <ul>
            <li>Use assessments to filter top talent early.</li>
            <li>Send personalized invitations for higher response.</li>
            <li>Monitor candidate statistics regularly.</li>
            <li>Keep job descriptions clear and concise.</li>
            <li>Leverage AI tools for candidate matching.</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="dashboard-panel activity-panel">
          <h2>🧾 Recent Activity</h2>
          <ul>
            {[
              "✅ You posted a new job 'Frontend Engineer'",
              "📤 15 invitations sent today",
              "📈 3 candidates completed their assessments",
              "🗓️ Scheduled 2 interviews for tomorrow",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-panel actions-panel">
          <h2>📌 Quick Actions</h2>
          <div className="actions-panel-buttons">
            <button onClick={() => handleQuickAction("Post Job")} className="quick-action-button post-job">
              + Post Job
            </button>
            <button onClick={() => handleQuickAction("Create Assessment")} className="quick-action-button create-assessment">
              + Create Assessment
            </button>
            <button onClick={() => handleQuickAction("Invite Candidates")} className="quick-action-button invite-candidates">
              + Invite Candidates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;