import React from 'react';
import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Responses from '../components/collabpage/Responses';
import {useAuth} from '../context/AuthContext'

const CollabPage = ({ deleteCollab }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const collab = useLoaderData();
  const {currentUser} = useAuth(); // Simulated logged-in user

  const onDeleteClick = async (collabId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this collab?');
    if (!confirmDelete) return;

    try {
      await deleteCollab(collabId);
      toast.success('Collab deleted successfully');
      navigate('/dashboard/collabs');
    } catch (err) {
      console.error('Error deleting collab:', err);
      toast.error('Failed to delete collab');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
  {/* Go Back */}
  <div className="max-w-3xl mx-auto mb-4">
    <button
      onClick={() => navigate(-1)}
      className="inline-block text-indigo-400 hover:text-indigo-500 text-sm"
    >
      ← Go Back
    </button>
  </div>


      {/* Collab Details */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">{collab.title}</h1>
        <p className="text-sm text-gray-400 mb-1">
          Posted by {' '}
          <Link
  to={`/dashboard/profiles/${collab.postedBy}`} 
  className="text-indigo-400 hover:underline"
>
  {collab.postedBy}
</Link> {' '} on{' '}
          {new Date(collab.postedOn).toLocaleDateString()} at{' '}
          {new Date(collab.postedOn).toLocaleTimeString()}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Genre: {collab.genre} | Role Needed: {collab.role}
        </p>
        <p className="mb-4">{collab.description}</p>

        {/* SoundCloud Embed */}
        {collab.link && (
          <div className="mt-6">
            <iframe
              title="SoundCloud Player"
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                collab.link
              )}&color=%23181818&auto_play=false&show_user=true`}
              className="rounded-lg"
            ></iframe>
          </div>
        )}

        {/* Manage Section */}
        {collab.postedBy === currentUser ? (
          <div className="flex gap-4 mt-6">
            <Link
              to={`/dashboard/edit-collab/${collab.id}`}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={() => onDeleteClick(collab.id)}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
             <Link
                  to={`/dashboard/collabs/${collab.id}/respond`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                >
               🤝 Respond to Collab
              </Link>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto bg-black-200 p-6 rounded-xl shadow-md mt-6">
          <Responses />
      </div>

    </div>
  );
};

export default CollabPage;
