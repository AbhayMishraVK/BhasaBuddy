import React from 'react';
import { useParams } from 'react-router-dom';
import video from './images/videogg.mp4'
import './VideoDetailPage.css';


const VideoDetailPageForHindi = () => {
  const { id } = useParams();

  // You can fetch video details using the ID from the backend here

  return (
    <div className="main-video-container">
      <h2>Learning Tutorial</h2>
      
       <video width="640" height="360" controls className="main-video-player" >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDetailPageForHindi;
