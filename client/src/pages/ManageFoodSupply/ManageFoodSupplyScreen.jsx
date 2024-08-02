import { useState, useEffect } from "react";
import FeedFoodSupply from "./UpdateFoodSupply";

const FoodSupplyManager = () => {
  const [foodSupply, setFoodSupply] = useState([]);
  const [newRecord, setNewRecord] = useState({
    type: "forage",
    description: "",
    quantity: "",
    nutritionalContent: "",
    cost: "",
  });

  useEffect(() => {
    fetchFoodSupply();
  }, []);

  const fetchFoodSupply = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/food-supply/getall');
        const data = await response.json();

        // Organize records by type
        const organizedData = data.reduce((acc, record) => {
            if (!acc[record.type]) {
                acc[record.type] = [];
            }
            acc[record.type].push(record);
            return acc;
        }, {});

        setFoodSupply(organizedData);
    } catch (error) {
        console.error('Error fetching food supply:', error);
    }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value,
    });
  };

  const handleAddRecord = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/food-supply/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        }
      );

      if (response.ok) {
        fetchFoodSupply();
        setNewRecord({
          type: "forage",
          description: "",
          quantity: "",
          nutritionalContent: "",
          cost: "",
        });
      } else {
        console.error("Error adding record:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Food Supply Manager</h2>
      <form className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={newRecord.type}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="forage">Forage</option>
            <option value="silage">Silage</option>
            <option value="hay">Hay</option>
            <option value="concentrates">Concentrates</option>
            <option value="byProducts">By-products</option>
            <option value="specialtyFeeds">Specialty Feeds</option>
            <option value="waterSupply">Water Supply</option>
            <option value="feedAdditives">Feed Additives</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={newRecord.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            value={newRecord.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Nutritional Content
          </label>
          <input
            type="text"
            name="nutritionalContent"
            value={newRecord.nutritionalContent}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <input
            type="text"
            name="cost"
            value={newRecord.cost}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleAddRecord}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Record
        </button>
      </form>

      <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Food Supply Manager</h2>
            
            <h3 className="text-xl font-semibold mb-2">Food Supply Records</h3>
            {Object.entries(foodSupply).map(([type, records]) => (
                <div key={type} className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nutritional Content</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.nutritionalContent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
        <FeedFoodSupply/>
    </div>
  );
};

export default FoodSupplyManager;
