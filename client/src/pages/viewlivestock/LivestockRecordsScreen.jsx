import { useEffect, useState } from "react";
import AddLivestockScreen from "./AddLivestockScreen";
import { fetchAllLivestock } from "../../Services/fetchAllLivestock";

export default function LivestockRecordsScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLivestock = async () => {
      try {
        const data = await fetchAllLivestock();
        setLivestock(data);
      } catch (error) {
        setError("Failed to fetch livestock");
      } finally {
        setLoading(false);
      }
    };

    getLivestock();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Livestock List</h1>
        <ul>
          {livestock.length === 0 ? (
            <p>No livestock found</p>
          ) : (
            livestock.map((item) => (
              <li key={item._id} className="border p-4 mb-4 rounded">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Type: {item.Breed}</p>
                <p>Age: {item.age}</p>
              </li>
            ))
          )}
        </ul>
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
