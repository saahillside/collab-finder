import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfilePageHero from '../components/profilepage/ProfilePageHero';
import { Link, useParams } from 'react-router-dom';

const ProfilePage = ({ diffUser = false }) => {
  const { currentUser } = useAuth();
  const { id } = useParams(); // only used if diffUser is true

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const targetUser = diffUser ? id : currentUser;

      try {
        const res = await fetch(`/api/profiles/${targetUser}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (diffUser ? id : currentUser) {
      fetchProfile();
    }
  }, [diffUser, id, currentUser]);

  if (loading) return <div className="text-white p-6">Loading profile...</div>;
  if (!profile) return <div className="text-white p-6">Profile not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        {profile && <ProfilePageHero profile={profile} />}
        
        {!diffUser && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/dashboard/edit-profile"
              className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded transition"
            >
              Edit Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
