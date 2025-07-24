import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAuth} from '../context/AuthContext'

const AddResponsePage = () => {
  const { id } = useParams();
  const {currentUser} = useAuth(); // Simulated logged-in user

  const [formData, setFormData] = useState({
    message: '',
    soundcloud: '',
    instagram: '',
  });

  const [collabTitle, setCollabTitle] = useState('');

  useEffect(() => {
    const fetchCollabTitle = async () => {
      try {
        const res = await fetch(`/api/collabs/${id}`);
        const data = await res.json();
        setCollabTitle(data.title || 'Collab');
      } catch (err) {
        console.error('Failed to fetch collab title:', err);
      }
    };

    fetchCollabTitle();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const response = {
    ...formData,
    responseTo: id,
    responseBy: currentUser,
  };

  try {
    // Submit the response
    const res = await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    });

    if (!res.ok) throw new Error('Failed to submit response');

    // Fetch the collab to get its owner
    const collabRes = await fetch(`/api/collabs/${id}`);
    const collabData = await collabRes.json();
    const notifTo = collabData.postedBy;

    // Send notification to the collab owner
    const notification = {
      notifTo,
      notifBy: currentUser,
      type: 'response',
      message: 'Your collab got a new response!',
      relatedID: parseInt(id),
    };

    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });

    // Success toast only for response
    toast.success('Response submitted!');
    setFormData({
      message: '',
      soundcloud: '',
      instagram: '',
    });
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong.');
  }
};


  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto mb-4">
        <Link to={`/dashboard/collabs/${id}`} className="text-indigo-400 hover:text-indigo-500 text-sm">
          ← Go Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl max-w-3xl mx-auto space-y-4"
      >
        <h2 className="text-xl font-bold text-white">
          Respond to <span className="text-indigo-400">"{collabTitle}"</span>
        </h2>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label htmlFor="soundcloud" className="block mb-1 font-medium">
            SoundCloud Link
          </label>
          <input
            type="url"
            name="soundcloud"
            id="soundcloud"
            placeholder="SoundCloud link"
            value={formData.soundcloud}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>

        <div>
          <label htmlFor="instagram" className="block mb-1 font-medium">
            Instagram Link
          </label>
          <input
            type="url"
            name="instagram"
            id="instagram"
            placeholder="Instagram link"
            value={formData.instagram}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
};

export default AddResponsePage;
