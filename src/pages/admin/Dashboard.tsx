import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard - TechWave';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600">
        Welcome back, Admin! Real dashboard data will appear here once integrated.
      </p>
    </div>
  );
};

export default Dashboard;