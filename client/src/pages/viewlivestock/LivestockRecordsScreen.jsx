import { useState } from "react";
import AddLivestockScreen from "./AddLivestockScreen";

export default function LivestockRecordsScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLivestock = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Livestock Records</h1>
      {/* Replace with dynamic content */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p>ID: 001</p>
        <p>Name: Daisy</p>
        <p>Breed: Holstein</p>
        <p>Age: 4</p>
        <p>Health Status: Good</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p>ID: 002</p>
        <p>Name: Buttercup</p>
        <p>Breed: Jersey</p>
        <p>Age: 3</p>
        <p>Health Status: Fair</p>
      </div>
      <div>
        <button
          onClick={handleAddLivestock}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Livestock
        </button>
        {isModalOpen && <AddLivestockScreen onClose={handleCloseModal} />}
      </div>
    </div>
  );
}
