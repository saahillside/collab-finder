// src/pages/EditCollabPage.jsx
import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCollabPage = ({ updateCollabSubmit }) => {
  const collab = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(collab.title || '');
  const [role, setRole] = useState(collab.role || '');
  const [genre, setGenre] = useState(collab.genre || '');
  const [description, setDescription] = useState(collab.description || '');
  const [link, setLink] = useState(collab.link || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCollab = {
      id,
      title,
      role,
      genre,
      description,
      link,
      postedBy: collab.postedBy,
      postedOn: collab.postedOn,
      responses: collab.responses || 0,
    };

    updateCollabSubmit(updatedCollab);
    toast.success('Collab updated!');
    navigate(`/dashboard/collabs/${id}`);
  };

  return (
    <section className="bg-gray-900 min-h-screen text-white py-12 px-6">
      <div className="relative max-w-2xl mx-auto bg-black p-8 rounded-xl shadow-md">

        {/* Go Back Button */}
         <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-blue-800 hover:bg-blue-900 text-white px-4 py-1 rounded"
          >
            Go Back
      </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Edit Collab</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              className="w-full px-3 py-2 text-black rounded"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <input
              className="w-full px-3 py-2 text-black rounded"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Genre</label>
            <input
              className="w-full px-3 py-2 text-black rounded"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 text-black rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-2">SoundCloud Link</label>
            <input
              className="w-full px-3 py-2 text-black rounded"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded w-full"
          >
            Update Collab
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCollabPage;
