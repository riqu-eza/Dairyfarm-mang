/* eslint-disable react/prop-types */
import  { useState } from "react";

const AddLivestockModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    Breed: "",
    age: "",
    healthStatus: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to add livestock
      await fetch("http://localhost:3001/api/Livestock/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Close the modal upon successful addition
      onClose();
    } catch (error) {
      console.error("Error adding livestock:", error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <span
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-2xl"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">Add Livestock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Breed:</label>
            <input
              type="text"
              name="Breed"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age:</label>
            <input
              type="date"
              name="age"
              value={formData.age}
              placeholder="D.O.B"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Health Status:</label>
            <input
              type="text"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLivestockModal;
