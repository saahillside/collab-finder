import React, { useState, useEffect } from 'react';
import { genres, roles } from '../../data/collabMeta';

const FilterBar = ({ onFilterChange }) => {
  const [genre, setGenre] = useState('');
  const [role, setRole] = useState('');

  // Notify parent when filters change
  useEffect(() => {
    onFilterChange({ genre, role });
  }, [genre, role]);

  const handleClear = () => {
    setGenre('');
    setRole('');
    // The useEffect will automatically notify the parent
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      {/* Genre Filter */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Role Filter */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
      >
        <option value="">All Roles</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Clear Button */}
      {(genre || role) && (
        <button
          onClick={handleClear}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
