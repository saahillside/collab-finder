import React, { useState, useEffect } from 'react';
import CollabCard from './CollabCard';
import { Link } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext.jsx'

const RecentAddedCollabs = ({ isGlobal, isHome = false }) => {
  const [collabs, setCollabs] = useState([]);
  const title = isGlobal ? 'Recently Added Collabs' : 'Your Recent Collabs';
  const link = isGlobal ? '/dashboard/collabs' : '/dashboard/your-collabs';

  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchCollabs = async () => {
      const apiURL = '/api/collabs';
      try {
        const res = await fetch(apiURL);
        const data = await res.json();

        data.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));

        setCollabs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchCollabs();
  }, []);

  let filteredCollabs = isGlobal
    ? collabs.filter((collab) => collab.postedBy !== currentUser)
    : collabs.filter((collab) => collab.postedBy === currentUser);

  filteredCollabs = isHome ? filteredCollabs.slice(0, 3) : filteredCollabs;

  return (
    <div className="bg-black text-white p-6 shadow mt-8 rounded-xl">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex justify-center">
          {title}
        </h2>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredCollabs.length > 0 ? (
            filteredCollabs.map((collab) => (
              <CollabCard key={collab.id} collab={collab} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 italic">
              No recent collabs.
            </div>
          )}
    </div>

      {/* View All button */}
      <div className="flex justify-center">
        <Link to={link}>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition text-sm">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecentAddedCollabs;
