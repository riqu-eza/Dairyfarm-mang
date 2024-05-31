import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings'); // Adjust the path to your settings page
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Farmer Dashboard</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Farm Overview</h3>
            <p className="text-sm">Details about the farm...</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Tasks</h3>
            <p className="text-sm">List of tasks...</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Reports</h3>
            <p className="text-sm">Reports and analytics...</p>
          </div>
        </div>
        <button
          onClick={handleSettingsClick}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
