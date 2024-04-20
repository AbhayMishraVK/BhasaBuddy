import React from 'react';
import { useParams } from 'react-router-dom';

const VideoDetailPageForPunjabi = () => {
  const { id } = useParams();

  // You can fetch video details using the ID from the backend here
  
  return (
    <div>
      <h2>Video Detail Page</h2>
      <p>Video ID: {id}</p>
      {/* Display video here */}
    </div>
  );
};

export default VideoDetailPageForPunjabi;
