import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PunjabiVideoPage from './PunjabiVideoPage';
import VideoDetailPageForPunjabi from './VideoDetail';

const VideoRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PunjabiVideoPage />} />
      <Route path="/video/:id" element={<VideoDetailPageForPunjabi />} />
    </Routes>
  );
};

export default VideoRouter;
