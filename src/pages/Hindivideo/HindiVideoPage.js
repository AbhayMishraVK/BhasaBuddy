import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HindiVideoPage.css'; // Adjust the CSS file path
import CourseSVG from '../../images/thumb.svg'; // Adjust the SVG image path
import { useNavigate } from 'react-router-dom';

const HindiVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch video data from the backend API
    axios.get('/videos/hindi') // Adjust the endpoint according to your backend API
      .then(response => {
        setVideos(response.data.videos);
      })
      .catch(error => {
        console.error('Error fetching Hindi videos:', error);
      });
  }, []);

  // Dummy video data for testing
  const dummyVideos = [
    { 
      id: 1, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_1', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 2, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_2', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 3, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_3', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 4, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_4', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 5, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_5', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 6, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_6', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 7, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_7', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 8, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_8', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 9, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_9', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
    { 
      id: 10, 
      contentType: 'video/mp4', 
      video_data: 'dummy_base64_encoded_data_10', 
      thumbnail: CourseSVG, // SVG image for the thumbnail
    },
  ];

  useEffect(() => {
    // Use dummy data if videos state is empty
    if (videos.length === 0) {
      setVideos(dummyVideos);
    }
  }, [videos, dummyVideos]);

  // Function to split videos into rows
  const splitIntoRows = (videos, numPerRow) => {
    const rows = [];
    for (let i = 0; i < videos.length; i += numPerRow) {
      rows.push(videos.slice(i, i + numPerRow));
    }
    return rows;
  };

  // Function to handle click on a video thumbnail
  const handleVideoClick = (videoId) => {
    // // Send the video ID to the backend
    // axios.post('/videos/play', { videoId })
    //   .then(response => {
    //     // Handle the response from the backend if needed
    //     // For example, you can redirect the user to the video detail page
    //     navigate(`/video/${videoId}`);
    //   })
    //   .catch(error => {
    //     console.error('Error sending video ID to the backend:', error);
    //   });
    navigate('/video')
  };

  return (
    <div className="hindi-video-page">
      <div className="top-banner">
        <h1 className="title">Hindi Level 1</h1> {/* Adjust the title */}
        <div className="progress">0/10</div> {/* Adjust this as needed */}
      </div>
      <div className="video-grid">
        {/* Render videos in rows */}
        {splitIntoRows(videos, 4).map((row, rowIndex) => (
          <div key={rowIndex} className="video-row">
            {row.map((video, index) => (
              <div key={index} className="video-container" style={{ margin: '10px' }}>
                {/* Replace video element with img element */}
                <img
                  src={CourseSVG} // Set the SVG image as the source
                  alt={`Thumbnail ${rowIndex * 4 + index + 1}`} // Provide an alt text for accessibility
                  onClick={() => handleVideoClick(video.id)} // Call the handleVideoClick function with the video id
                  style={{ width: '240px', height: '200px' }} // Set the size of the SVG image
                />
                <div className="lesson-number">Lesson {rowIndex * 4 + index + 1}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default HindiVideoPage;
