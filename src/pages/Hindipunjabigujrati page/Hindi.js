import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hindi.module.css'; // Import module CSS file

function Hindi() {
  return (
    <div className={styles.move}>
      <h1>Welcome to the Learning Platform</h1>
      <div className={styles.sectionRow}>
        {/* CourseLink for Learn Hindi */}
        <CourseLink sectionName="Learn Hindi" courseName="Course 1" sectionColor="#FFD700" />
        {/* CourseLink for Learn Punjabi */}
        <CourseLink sectionName="Learn Punjabi" courseName="Course 1" sectionColor="#FF6347" />
        {/* CourseLink for Learn Gujarati */}
        <CourseLink sectionName="Learn Gujarati" courseName="Course 1" sectionColor="#4682B4" />
      </div>
    </div>
  );
}

function CourseLink({ sectionName, courseName, sectionColor }) {
  let courseLink = '';
  switch (sectionName) {
    case 'Learn Hindi':
      courseLink = '/learnhindi'; // Link for "Course 1" in "Learn Hindi"
      break;
    case 'Learn Punjabi':
      courseLink = '/learnpunjabi'; // Link for "Course 1" in "Learn Punjabi"
      break;
    case 'Learn Gujarati':
      courseLink = '/learngujarati'; // Link for "Course 1" in "Learn Gujarati"
      break;
    default:
      courseLink = '';
      break;
  }

  return (
    <Link to={courseLink} className={styles.sectionLink} style={{ backgroundColor: sectionColor }}>
      <div className={styles.section}>
        <h2>{sectionName}</h2>
        <div className={styles.courseContainer}>
          {/* Render CourseLink */}
          <Link to={courseLink} className={styles.courseLink}>
            <div className={styles.course}>{courseName}</div>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default Hindi;
