import React from 'react';

function CourseSVG() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#ccc" />
      <circle cx="50" cy="50" r="30" fill="#ffcc00" />
      <text x="50%" y="50%" textAnchor="middle" fill="#000" fontSize="20px">
        Course
      </text>
    </svg>
  );
}

export default CourseSVG;
