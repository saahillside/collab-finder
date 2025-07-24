import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { genres, roles } from '../data/collabMeta';

const EditProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profiles/${currentUser}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setProfile((prev) => {
      const list = prev[field] || [];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/profiles/${currentUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error('Update failed');
      toast.success('Profile updated!');
      navigate('/dashboard/profile');
    } catch (err) {
      console.error(err);
      toast.error('Could not update profile');
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!profile) return <div className="text-white p-6">Profile not found.</div>;

  return (
    <section className="bg-gray-900 min-h-screen text-white py-12 px-6">
      <div className="relative max-w-3xl mx-auto bg-black p-8 rounded-xl shadow-md">

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded"
        >
          Go Back
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1">Display Name</label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Genres</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleMultiSelect('genres', g)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.genres?.includes(g)
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
            <label className="block mb-1">Roles</label>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => handleMultiSelect('roles', r)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.roles?.includes(r)
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
            <label className="block mb-1">SoundCloud</label>
            <input
              type="url"
              name="soundcloud"
              value={profile.socialLinks?.soundcloud || ''}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    soundcloud: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Instagram</label>
            <input
              type="url"
              name="instagram"
              value={profile.socialLinks?.instagram || ''}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    instagram: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">YouTube</label>
            <input
              type="url"
              name="youtube"
              value={profile.socialLinks?.youtube || ''}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    youtube: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 text-black rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfilePage;
