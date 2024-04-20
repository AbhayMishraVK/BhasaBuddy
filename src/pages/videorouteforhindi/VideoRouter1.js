import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HindiVideoPage from './HindiVideoPage';
import VideoDetailPageForHindi from './VideoDetail1';

const VideoRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HindiVideoPage />} />
      <Route path="/video/:id" element={<VideoDetailPageForHindi />} />
    </Routes>
  );
};

export default VideoRouter;
