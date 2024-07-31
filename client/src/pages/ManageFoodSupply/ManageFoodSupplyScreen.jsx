import  { useState } from 'react';

export default function ManageFoodSupplyScreen() {
  const [foodSupply, setFoodSupply] = useState('');

  const handleChange = (e) => {
    setFoodSupply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Supply Management</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="number" placeholder="Total Food Supply (Kg)" value={foodSupply} onChange={handleChange} className="border p-2 rounded-lg" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update</button>
      </form>
    </div>
  );
}
