import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function UpdateMilkProductionDetailScreen({ closeModal }) {
  const [formData, setFormData] = useState({
    milkProductionKilos: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      milkProductionKilos: formData.milkProductionKilos,
    };

    try {
      const response = await fetch('http://localhost:3001/api/milk-production/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        // Handle success
        console.log('Milk production updated successfully');
        if (closeModal) closeModal(); // Close the modal on success if closeModal function is provided
      } else {
        // Handle error
        console.error('Failed to update milk production');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Milk Production</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="number" 
          id="milkProductionKilos" 
          placeholder="Milk Production (Kilos)" 
          onChange={handleChange} 
          className="border p-2 rounded-lg" 
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}
