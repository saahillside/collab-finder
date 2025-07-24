import React, { useEffect, useState } from "react";
import CollabCard from "../components/dashboard/CollabCard";
import FilterBar from "../components/collabspage/FilterBar";
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'


const CollabsPage = ({ isGlobal, isResponses }) => {
  const [collabs, setCollabs] = useState([]);
  const [filters, setFilters] = useState({ genre: '', role: '' });
  const [userResponses, setUserResponses] = useState([]);
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/collabs');
      const data = await res.json();
      data.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
      setCollabs(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isResponses) {
      const fetchUserResponses = async () => {
        const res = await fetch(`/api/responses?responseBy=${currentUser}`);
        const data = await res.json();
        setUserResponses(data.map(r => r.responseTo)); // list of collab IDs
      };
      fetchUserResponses();
    }
  }, [isResponses]);

  let filtered = collabs;

  if (isResponses) {
    filtered = filtered.filter(c => userResponses.includes(c.id));
  } else if (isGlobal) {
    filtered = filtered.filter(c => c.postedBy !== currentUser);
  } else {
    filtered = filtered.filter(c => c.postedBy === currentUser);
  }

  if (filters.genre) {
    filtered = filtered.filter(c => c.genre === filters.genre);
  }

  if (filters.role) {
    filtered = filtered.filter(c => c.role === filters.role);
  }

  const description = isResponses
    ? 'These are the collab posts you’ve responded to.'
    : isGlobal
      ? 'All collab posts that have been posted recently.'
      : 'All your collab posts in one place.';

  return (
    <div className="bg-black p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white flex justify-center">
        {isResponses ? 'Your Responses' : isGlobal ? 'All Collabs' : 'Your Collabs'}
      </h1>

      <div className="relative flex items-center justify-end mb-4 px-2 min-h-[60px]">
        <p className="absolute left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base text-center">
          {description}
        </p>

        {!isResponses && (
          <Link to="/dashboard/create-collab">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition whitespace-nowrap">
              + Create New Collab
            </button>
          </Link>
        )}
      </div>

      <FilterBar onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => <CollabCard key={c.id} collab={c} />)}
      </div>
    </div>
  );
};

export default CollabsPage;
