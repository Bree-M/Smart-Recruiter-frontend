import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const menu = [
    { name: 'Create Assessment', path: '/recruiter/create' },
    { name: 'Review & Publish', path: '/recruiter/review' },
    { name: 'Send Invitations', path: '/recruiter/invite' },
    { name: 'View Responses', path: '/recruiter/responses' },
    { name: 'Statistics', path: '/recruiter/stats' },
    { name: 'Feedback', path: '/recruiter/feedback' },
    { name: 'Grade Release', path: '/recruiter/grades' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menu.map((item, i) => (
          <Link to={item.path} key={i}>
            <div className="bg-gray-200 p-4 rounded hover:bg-gray-300 transition">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
