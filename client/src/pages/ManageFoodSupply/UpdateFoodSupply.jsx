/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const FeedFoodSupply = () => {
    const [foodSupply, setFoodSupply] = useState([]);
    const [feedingRecord, setFeedingRecord] = useState({
        type: '',
        description: '',
        quantityFed: '',
        feedDate: '',
    });

    useEffect(() => {
        fetchFoodSupply();
    }, []);

    const fetchFoodSupply = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/food-supply/getall');
            const data = await response.json();
            setFoodSupply(data);
        } catch (error) {
            console.error('Error fetching food supply:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedingRecord({
            ...feedingRecord,
            [name]: value,
        });
    };

    const handleFeedRecord = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/food-supply/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedingRecord),
            });

            if (response.ok) {
                fetchFoodSupply(); // Refresh the list
                setFeedingRecord({
                    type: '',
                    description: '',
                    quantityFed: '',
                    feedDate: '',
                });
            } else {
                console.error('Error updating record:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Feed Food Supply</h2>

            <form className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={feedingRecord.type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select type</option>
                        {['forage', 'silage', 'hay', 'concentrates', 'byProducts', 'specialtyFeeds', 'waterSupply', 'feedAdditives'].map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={feedingRecord.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity Fed</label>
                    <input
                        type="number"
                        name="quantityFed"
                        value={feedingRecord.quantityFed}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Feed Date</label>
                    <input
                        type="date"
                        name="feedDate"
                        value={feedingRecord.feedDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleFeedRecord}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Record Feeding
                </button>
            </form>
        </div>
    );
};

export default FeedFoodSupply;
