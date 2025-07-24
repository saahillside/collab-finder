import React from 'react';

const ProfilePageHero = ({ profile }) => {
  return (
    <div className="bg-[#030321] rounded-xl p-8 text-white shadow-lg max-w-3xl mx-auto flex items-center space-x-6">
      {/* Profile picture */}
      {profile.profilePicture && (
        <img
          src={profile.profilePicture}
          alt={`${profile.displayName}'s profile`}
          className="w-24 h-24 rounded-full object-cover "
        />
      )}

      {/* Profile info */}
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold mb-2">{profile.displayName}</h1>
        <p className="text-indigo-300 text-lg mb-4">@{profile.username}</p>
        <p className="text-gray-300 mb-6">{profile.bio}</p>

        {/* Genres */}
        {profile.genres && profile.genres.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-indigo-300 mb-1">Genres:</h3>
            <div className="flex flex-wrap gap-2">
              {profile.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-indigo-700 text-indigo-100 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Roles */}
        {profile.roles && profile.roles.length > 0 && (
          <div>
            <h3 className="font-semibold text-indigo-300 mb-1">Roles:</h3>
            <div className="flex flex-wrap gap-2">
              {profile.roles.map((role) => (
                <span
                  key={role}
                  className="bg-indigo-700 text-indigo-100 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social links */}
        <div className="flex space-x-6 mt-6">
          {profile.socialLinks.soundcloud && (
            <a
              href={profile.socialLinks.soundcloud}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-600 transition font-semibold"
            >
              SoundCloud
            </a>
          )}
          {profile.socialLinks.instagram && (
            <a
              href={profile.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-pink-500 hover:text-pink-700 transition font-semibold"
            >
              Instagram
            </a>
          )}
          {profile.socialLinks.youtube && (
            <a
              href={profile.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-red-600 hover:text-red-800 transition font-semibold"
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageHero;

