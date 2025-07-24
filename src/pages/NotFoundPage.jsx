import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-6 text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition text-sm"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
