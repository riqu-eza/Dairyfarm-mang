import { useState } from 'react';
import UpdateMilkProductionDetailScreen from './UpdateMilkProductionDetailScreen';

export default function MainComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Update Milk Production
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 bg-red-500 text-white py-1 px-2 rounded-full"
            >
              &times;
            </button>
            <UpdateMilkProductionDetailScreen closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
