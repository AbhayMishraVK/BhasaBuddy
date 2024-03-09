import React from "react";
import './help.css';


const BhashaBuddyNavigation = () => {
  const sections = [
    { id: 1, name: "Getting Started", link: "Getting-Started-on-Bhasha-Buddy" },
    { id: 2, name: "Technical Problems", link: "Troubleshoot-bugs-and-report-issues" },
    { id: 3, name: "Account Settings", link: "Customise-your-learning-and-update-profile" },
    { id: 4, name: "Feedback and Feature Requests", link: "Leave-feedback-or-request-new-features" },
    { id: 5, name: "Data and Privacy", link: "Learn-more-about-your-personal-data" },
  ];

  return (
    <nav>
      <ul>
        {sections.map(({ id, name, link }) => (
          <li key={id}>
            <a href={`#${link}`}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BhashaBuddyNavigation;