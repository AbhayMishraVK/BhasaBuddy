import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';

function Homepage() {
  const [userInfo, setUserInfo] = useState({});
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }

    axios.post('/home-info', { email })
      .then(response => {
        const { name, courses, continue_learning } = response.data;
        console.log(name, courses, continue_learning);
        setUserInfo({ name });
        setCourses(courses.courses);
        setProgress([continue_learning]); // Wrap single progress object into an array
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <body className={styles.homepageBody}>
      <div className={styles.homepageContainer}>
        <div className={styles.homepageSidebar}>
          <div className={styles.homepageProfileInfo}>
            <img src="Bhasha.png" alt="Profile" />
            <p>Bhasha Buddy</p>
          </div>
          <p>Empowering Regional language</p>
          <div className={styles.homepageOptions}>
            <ul>
              <li><Link to="/user/profile">Dashboard</Link></li>
              <li><Link to="/cardgame">Games</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/tips">Tips</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/logout">Logout</Link></li>
              <li><Link to="/help">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.homepageContent}>
          <div className={styles.container}>
            <div className={styles.section1}>
              <div className={styles.top}>
                <h2>Top Courses</h2>
              </div>
              <div className={styles.homepageSections}>
                {courses.map(course => (
                  <Link to={`/${course.course_route}`} key={course.course_route}>
                    <div className={styles.homepageSection}>
                      <img style={{ width: '700px', borderRadius: '10px' }} src={`data:image/svg+xml;base64,${course.course_image}`} alt={course.course_name} />
                      <div className={styles.homepageSectionInfo}>
                        <h3>{course.course_name}</h3>
                        <div className="profile">
                          <img src={'/profile1/user.jpeg'} alt={course.teacher_name} className={styles.profileImage} />
                          <span>{course.teacher_name}</span>
                          <button className={styles['grad-button']}>{course.rating}</button>
                        </div>
                        <p>Description: {course.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.section1}>
              <h2>Continue Learning</h2>
              <div className={styles.homepageProgress}>
                {progress.map(progressData => (
                  <div key={progressData.title} className={styles.courseProgress}>
                    <h3>{progressData.title}</h3>
                    <img style={{ width: '200px', borderRadius: '10px' }} src={`data:image/svg+xml;base64,${progressData.course_image}`} alt={progressData.title} />
                    <progress className={styles.progress} value={progressData.percentage_completed} max="100">
                      {progressData.percentage_completed}%
                    </progress>
                    {progressData.percentage_completed}% completed
                  </div>
                ))}
              </div>
            </div>
            {/* Second section - Chatbot */}
            <a href="https://mean-falcons-occur.loca.lt/" target="_blank" >
  <div className={styles.section} >
    <h2>Chatbot</h2>
    {/* Additional content if any */}
  </div>
</a>
          
            
          </div>
        </div>
      </div>
    </body>
  );
}

export default Homepage;
