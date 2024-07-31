import { Link } from 'react-router-dom';

export default function UpdateMilkProductionScreen() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Milk Production</h1>
      {/* Replace with dynamic content */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p>ID: 001</p>
        <p>Name: Daisy</p>
        <p>Milk Production: 20L</p>
        <Link to="/update-milk-production-detail/001" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update</Link>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p>ID: 002</p>
        <p>Name: Buttercup</p>
        <p>Milk Production: 18L</p>
        <Link to="/update-milk-production-detail/002" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update</Link>
      </div>
    </div>
  );
}
