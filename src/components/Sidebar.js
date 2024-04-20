import React from 'react';
import { FaInfo,FaCog,FaInfoFaVideo, FaComments, FaPaperPlane } from 'react-icons/fa'; // Import Font Awesome icons
import './Sidebar.css'
function Sidebar() {
  return (
    <header className="main-head">
      <nav className="head-nav">
        <ul className="menu">
          <li>
            <a href="#">
              <FaCog className="person" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaInfo className="video-player" />
              <span>Info</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Sidebar;
