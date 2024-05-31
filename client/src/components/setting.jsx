import React, { useState } from 'react';

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        fullName: "", email: "", role: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData); // Log form data before sending request

        try {
            const response = await fetch("http://localhost:3001/api/farm/subuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(formData);

            if (response.ok) {
                console.log("User created successfully", data);
                setFormData({
                    fullName: "",
                    email: "",
                    role: ""
                });
            } else {
                console.error("Failed to create user:", data.message);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-1"> Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-green-500"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="worker">Worker</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create User</button>
            </form>
        </div>
    );
};

export default CreateUserForm;
