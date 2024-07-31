import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function UpdateMilkProductionDetailScreen({ match }) {
  const [formData, setFormData] = useState({
    // eslint-disable-next-line react/prop-types
    id: match.params.id,
    milkProduction: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Milk Production</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" id="id" value={formData.id} readOnly className="border p-2 rounded-lg" />
        <input type="number" id="milkProduction" placeholder="Milk Production (Liters)" onChange={handleChange} className="border p-2 rounded-lg" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Save</button>
      </form>
    </div>
  );
}
