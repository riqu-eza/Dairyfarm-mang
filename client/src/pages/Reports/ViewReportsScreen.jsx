import { Link } from 'react-router-dom';

export default function ViewReportsScreen() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="flex flex-col gap-4">
        <Link to="/report/daily-milk-production" className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center">Daily Milk Production</Link>
        <Link to="/report/weekly-milk-production" className="bg-green-500 text-white py-2 px-4 rounded-lg text-center">Weekly Milk Production</Link>
        <Link to="/report/monthly-milk-production" className="bg-yellow-500 text-white py-2 px-4 rounded-lg text-center">Monthly Milk Production</Link>
        <Link to="/report/food-supply" className="bg-purple-500 text-white py-2 px-4 rounded-lg text-center">Food Supply Report</Link>
      </div>
    </div>
  );
}
