import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
                <a href="/settings" style={{ color: 'white', textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faCog} />
                </a>
                <a href="/info" style={{ color: 'white', textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </a>
    </div>
  );
};


const YourComponent = () => {
  return (
    <div>
      <Sidebar />
    
    </div>
  );
};

export default YourComponent;
