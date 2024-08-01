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


  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
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
            <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Livestock List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse block lg:table">
          <thead className="block lg:table-header-group">
            <tr className="border border-gray-300 lg:border-none block lg:table-row absolute -top-full lg:top-auto -left-full lg:left-auto lg:relative">
              <th className="bg-gray-200 p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">#</th>
              <th className="bg-gray-200 p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">Name</th>
              <th className="bg-gray-200 p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">Type</th>
              <th className="bg-gray-200 p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">Age (years)</th>
            </tr>
          </thead>
          <tbody className="block lg:table-row-group">
            {livestock.length === 0 ? (
              <tr className="bg-white border border-gray-300 lg:border-none block lg:table-row">
                <td colSpan="4" className="p-2 text-center lg:border lg:border-gray-300 block lg:table-cell">No livestock found</td>
              </tr>
            ) : (
              livestock.map((item, index) => (
                <tr key={item._id} className="bg-white border border-gray-300 lg:border-none block lg:table-row">
                  <td className="p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">{index + 1}</td>
                  <td className="p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">{item.name}</td>
                  <td className="p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">{item.Breed}</td>
                  <td className="p-2 text-left lg:border lg:border-gray-300 block lg:table-cell">{calculateAge(item.age)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
