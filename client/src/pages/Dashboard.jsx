import { Link } from 'react-router-dom';

const Dashboard = () => {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dairy Farm Management</h1>
      <div className="flex flex-col gap-4">
        <Link to="/view-livestock" className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center">View Livestock</Link>
        <Link to="/update-milk-production" className="bg-green-500 text-white py-2 px-4 rounded-lg text-center">Update Milk Production</Link>
        <Link to="/manage-food-supply" className="bg-yellow-500 text-white py-2 px-4 rounded-lg text-center">Manage Food Supply</Link>
        <Link to="/view-reports" className="bg-purple-500 text-white py-2 px-4 rounded-lg text-center">View Reports</Link>
      </div>
    </div>
  );
};

export default Dashboard;
