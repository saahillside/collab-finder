import React from 'react';
import { Link } from 'react-router-dom';

const ResponseCard = ({ response }) => {
  return (
    <li className="bg-[#22004a] shadow p-4 rounded-xl">
      <p className="font-medium">
        <Link
          to={`/dashboard/profiles/${response.responseBy}`}
          className="text-indigo-400 hover:underline"
        >
          @{response.responseBy}
        </Link>
      </p>

      <p className="mt-1">{response.message}</p>

      {response.soundcloud && (
        <p className="mt-2">
          <a
            href={response.soundcloud}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            SoundCloud Link
          </a>
        </p>
      )}

      {response.ig && (
        <p>
          <a
            href={response.ig}
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 underline"
          >
            Instagram
          </a>
        </p>
      )}
    </li>
  );
};

export default ResponseCard;
