import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Bar,
  Pie,
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../../styles/Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const fetchAnalyticsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    applicationsPerJob: {
      labels: ['Frontend Dev', 'Backend Dev', 'UI/UX Designer', 'Data Analyst'],
      datasets: [
        {
          label: 'Applications',
          data: [25, 40, 15, 30],
          backgroundColor: '#6366F1'
        }
      ]
    },
    passFailData: {
      labels: ['Passed', 'Failed'],
      datasets: [
        {
          label: 'Assessment Outcome',
          data: [60, 40],
          backgroundColor: ['#34D399', '#F87171']
        }
      ]
    },
    averageScores: {
      labels: ['Frontend Dev', 'Backend Dev', 'UI/UX Designer', 'Data Analyst'],
      datasets: [
        {
          label: 'Avg Score (%)',
          data: [78, 67, 82, 70],
          borderColor: '#3B82F6',
          backgroundColor: '#BFDBFE',
          fill: true
        }
      ]
    },
    topCandidates: [
      { id: 1, name: 'Jane Doe', job: 'Frontend Dev', score: 95 },
      { id: 2, name: 'John Smith', job: 'Backend Dev', score: 90 },
      { id: 3, name: 'Mary Wanjiru', job: 'Data Analyst', score: 88 }
    ]
  };
};

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    applicationsPerJob: { labels: [], datasets: [] },
    passFailData: { labels: [], datasets: [] },
    averageScores: { labels: [], datasets: [] },
    topCandidates: []
  });
  const [timePeriod, setTimePeriod] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch {
        setError('Failed to load analytics data.');
        toast.error('Failed to load analytics data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTimePeriodChange = useCallback(e => {
    setTimePeriod(e.target.value);
  }, []);

  const handleExportChart = useCallback((chartName, data) => {
    let csvContent;
    if (chartName === 'TopCandidates') {
      csvContent = [
        ['Name', 'Job Applied', 'Score'],
        ...data.map(cand => [cand.name, cand.job, `${cand.score}%`])
      ]
        .map(row => row.join(','))
        .join('\n');
    } else {
      csvContent = [
        [data.datasets[0].label, ...data.labels],
        ['', ...data.datasets[0].data]
      ]
        .map(row => row.join(','))
        .join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${chartName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`${chartName} exported successfully!`);
  }, []);

  const summaryStats = {
    totalApplications: analyticsData.applicationsPerJob.datasets[0]?.data.reduce((sum, val) => sum + val, 0) || 0,
    averageScore: analyticsData.averageScores.datasets[0]?.data.reduce((sum, val, _, { length }) => sum + val / length, 0).toFixed(1) || 0,
    passRate: analyticsData.passFailData.datasets[0]?.data[0] || 0
  };

  return (
    <div className="analytics-wrapper">
      <div className="glass-panel">
        <h1 className="analytics-title">Recruitment Analytics</h1>

        <div className="controls-panel">
          <div className="form-control-group">
            <label htmlFor="timePeriod">Time Period</label>
            <div className="select-wrapper">
              <select
                id="timePeriod"
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="select-field"
                aria-label="Filter analytics by time period"
              >
                <option value="All">All Time</option>
                <option value="7Days">Last 7 Days</option>
                <option value="30Days">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="info-message">Loading...</p>
        ) : error ? (
          <p className="error-message info-message">{error}</p>
        ) : (
          <>
            <h2 className="section-title">Summary</h2>
            <div className="summary-grid">
              <div className="summary-stat-card">
                <h3>Total Applications</h3>
                <p>{summaryStats.totalApplications}</p>
              </div>
              <div className="summary-stat-card">
                <h3>Average Score</h3>
                <p>{summaryStats.averageScore}%</p>
              </div>
              <div className="summary-stat-card">
                <h3>Pass Rate</h3>
                <p>{summaryStats.passRate}%</p>
              </div>
            </div>

            <div className="chart-grid">
              <div className="chart-panel">
                <h2 className="section-title">Applications Per Job</h2>
                <div className="chart-container">
                  <Bar
                    data={analyticsData.applicationsPerJob}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }
                    }}
                    aria-label="Applications per job bar chart"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleExportChart('ApplicationsPerJob', analyticsData.applicationsPerJob)}
                  className="action-button"
                  aria-label="Export Applications Per Job data"
                >
                  Export
                </button>
              </div>

              <div className="chart-panel">
                <h2 className="section-title">Pass / Fail Ratio</h2>
                <div className="chart-container">
                  <Pie
                    data={analyticsData.passFailData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }
                    }}
                    aria-label="Pass/Fail ratio pie chart"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleExportChart('PassFailRatio', analyticsData.passFailData)}
                  className="action-button"
                  aria-label="Export Pass/Fail Ratio data"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="chart-panel">
              <h2 className="section-title">Average Score Per Role</h2>
              <div className="chart-container">
                <Line
                  data={analyticsData.averageScores}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true, max: 100 } }
                  }}
                  aria-label="Average score per role line chart"
                />
              </div>
              <button
                type="button"
                onClick={() => handleExportChart('AverageScores', analyticsData.averageScores)}
                className="action-button"
                aria-label="Export Average Scores data"
              >
                Export
              </button>
            </div>

            <div className="table-panel">
              <h2 className="section-title">Top Performing Candidates</h2>
              <div className="table-container">
                <table className="candidates-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Job Applied</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topCandidates.map(cand => (
                      <tr key={cand.id}>
                        <td>{cand.name}</td>
                        <td>{cand.job}</td>
                        <td>{cand.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => handleExportChart('TopCandidates', analyticsData.topCandidates)}
                className="action-button"
                aria-label="Export Top Candidates data"
              >
                Export
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;