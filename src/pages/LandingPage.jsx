import React from 'react';
import { Link } from 'react-router-dom';
import bwstudio from '../images/bwstudio.jpg'; // Adjust if your path is different

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-6 text-white"
      style={{
        backgroundImage: `url(${bwstudio})`,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundBlendMode: 'darken'
      }}
    >
      <h1 className="text-5xl font-bold mb-6 text-center drop-shadow-lg">Welcome to CollabFinder</h1>
      <p className="text-lg text-gray-200 mb-8 text-center drop-shadow-md">
        Find collaborators, share music, and build something amazing together.
      </p>

      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold shadow-md">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-semibold shadow-md">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
