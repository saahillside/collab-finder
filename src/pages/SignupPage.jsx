import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { genres as genreOptions, roles as roleOptions } from '../data/collabMeta';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    bio: '',
    profilePicture: '',
    genres: [],
    roles: [],
    soundcloud: '',
    instagram: '',
    youtube: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const check = await fetch(`/api/profiles?username=${formData.username}`);
      const existing = await check.json();

      if (existing.length > 0) {
        toast.error('Username already taken');
        return;
      }
    } catch (err) {
      toast.error('Error checking username');
      return;
    }

    const newProfile = {
      id: formData.username,
      username: formData.username,
      password: formData.password,
      displayName: formData.displayName,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
      genres: formData.genres,
      roles: formData.roles,
      socialLinks: {
        soundcloud: formData.soundcloud,
        instagram: formData.instagram,
        youtube: formData.youtube
      }
    };

    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });

      if (!res.ok) throw new Error('Signup failed');

      toast.success('✅ Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('❌ Could not sign up');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative">
      {/* 🔙 Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-full max-w-xl space-y-4">
        {/* All your existing form fields stay unchanged */}
        {/* ... */}

        <div>
          <label className="block mb-1 font-medium">Username *</label>
          <input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password *</label>
          <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Display Name *</label>
          <input type="text" name="displayName" required value={formData.displayName} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio *</label>
          <textarea name="bio" required value={formData.bio} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" rows={2} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture URL *</label>
          <input type="text" name="profilePicture" required value={formData.profilePicture} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Genres *</label>
          <div className="flex flex-wrap gap-2">
            {genreOptions.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => handleMultiSelect('genres', g)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.genres.includes(g)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Roles *</label>
          <div className="flex flex-wrap gap-2">
            {roleOptions.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => handleMultiSelect('roles', r)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.roles.includes(r)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">SoundCloud *</label>
          <input type="url" name="soundcloud" required value={formData.soundcloud} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Instagram *</label>
          <input type="url" name="instagram" required value={formData.instagram} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">YouTube *</label>
          <input type="url" name="youtube" required value={formData.youtube} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
