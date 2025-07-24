import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { genres, roles } from '../data/collabMeta';
import {useAuth} from '../context/AuthContext'

const CreateCollabPage = ({ addCollabSubmit }) => {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useAuth();


  const submitForm = (e) => {
    e.preventDefault();

    const newCollab = {
      title,
      role,
      genre,
      description,
      link,
      postedBy: currentUser,
      postedOn: new Date().toISOString(),
    };

    addCollabSubmit(newCollab);
    toast.success('Collab added!');
    navigate('/dashboard/collabs');
  };

  return (
    <section className="bg-black">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-[#120010] px-6 py-8 shadow-md rounded-md border m-4 md:m-0">

          {/* Go Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 text-indigo-400 hover:underline text-sm"
          >
            ← Go Back
          </button>

          <form onSubmit={submitForm}>
            <h2 className="text-indigo-600 text-2xl text-center font-semibold mb-6">Create New Collab</h2>

            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Project Title</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="e.g. Looking for a singer"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Role Needed</label>
              <select
                className="border rounded w-full py-2 px-3"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Genre</label>
              <select
                className="border rounded w-full py-2 px-3"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Description</label>
              <textarea
                rows="4"
                className="border rounded w-full py-2 px-3"
                placeholder="Describe your project, expectations, vibe, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-white font-bold mb-2">SoundCloud / IG / YouTube Link</label>
              <input
                type="url"
                className="border rounded w-full py-2 px-3"
                placeholder="https://soundcloud.com/yourtrack"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Post Collab
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCollabPage;
