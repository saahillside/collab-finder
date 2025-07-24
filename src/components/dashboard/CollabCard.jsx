import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CollabCard = ({ collab }) => {
  const [responseCount, setResponseCount] = useState(null);

  useEffect(() => {
    const fetchResponseCount = async () => {
      try {
        const res = await fetch(`/api/responses?responseTo=${collab.id}`);
        const data = await res.json();
        setResponseCount(data.length);
      } catch (err) {
        console.error('Failed to fetch responses:', err);
      }
    };

    fetchResponseCount();
  }, [collab.id]);

  if (!collab) return null;

  const formattedDate = new Date(collab.postedOn).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to={`/dashboard/collabs/${collab.id}`} className="block">
      <div
        style={{ backgroundColor: '#120010' }}
        className="rounded-xl shadow p-5 text-gray-800 space-y-3 transition duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-indigo-600">{collab.title}</h2>
            <p className="text-sm text-gray-600">Role Needed: {collab.role}</p>
            <p className="text-sm text-gray-600">Genre: {collab.genre}</p>
            <p className="text-sm text-gray-500 mt-1 italic">Posted by: {collab.postedBy}</p>
          </div>
          <p className="text-sm text-gray-500">Posted on: {formattedDate}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700">
            Responses: {responseCount !== null ? responseCount : '...'}
          </p>

          <span className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollabCard;
