import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import {useAuth} from '../../context/AuthContext'

const Responses = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [postedBy, setPostedBy] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collab details to determine ownership
        const collabRes = await fetch(`/api/collabs/${id}`);
        const collabData = await collabRes.json();
        setPostedBy(collabData.postedBy);

        // Fetch all responses for the collab
        const res = await fetch(`/api/responses?responseTo=${id}`);
        const data = await res.json();

        // Filter based on ownership
        if (collabData.postedBy === currentUser) {
          setResponses(data); // Show all if it's your collab
        } else {
          // Show only your responses to this collab
          setResponses(data.filter((r) => r.responseBy === currentUser));
        }
      } catch (err) {
        console.error('Error fetching responses or collab info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return null;

  const isOwner = postedBy === currentUser;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isOwner ? 'Responses:' : 'Your Responses:'}
      </h2>

      {responses.length === 0 ? (
        <p className = "text-center">{isOwner ? 'No responses yet.' : "You haven't responded to this collab yet."}</p>
      ) : (
        <ul className="space-y-4">
          {responses.map((res) => (
            <ResponseCard key={res.id} response={res} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Responses;
