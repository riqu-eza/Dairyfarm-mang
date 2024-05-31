// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Dairy Farm Management System</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Manage your dairy farm efficiently with our comprehensive tools and reports.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
