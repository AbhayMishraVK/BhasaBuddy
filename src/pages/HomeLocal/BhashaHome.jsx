import React from 'react';
import logo from './images/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './BhashaHome.module.css'; // Import module CSS file
import book from './images/book-ani.png';
import tog from './images/together.svg';
import con from './images/confidence.svg';
import rea from './images/real_life.svg';
import all from './images/for_all_type_peep.png';

const BhashaHomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const handleNavigation = (route) => {
        navigate(route); // Use navigate to navigate to the specified route
    };

    return (
        <div className={styles['home-container']}>
            <div className={styles['home-nav']}>
                <div className={styles['home-nav-lp']}>
                    <img style={{ height: '150px' }} src={logo} alt="logo" />
                    <h1>Bhasha Buddy</h1>
                    <p>empowering regional languages</p>
                </div>
                <div className={styles['home-nav-rp']}>
                    <button onClick={() => handleNavigation('/blogs')} className={styles['home-button']}>Blogs</button>
                    <button onClick={() => handleNavigation('/login')} className={styles['home-button']}>Log in</button>
                    <button onClick={() => handleNavigation('/signup')} className={styles['home-button']}>Get started</button>
                </div>

            </div>

            <article className={styles['home-desc']}>
                <img src={book} alt="" />
                <div className={styles['home-p1']}>
                    <h2>Discover</h2>
                    <p>Bhasha Buddy is more than just an app; it's your key to unlocking the wonders of your native language and connecting with your cultural heritage. Start your adventure today! Locate your proficiency</p>
                </div>
                <div className={styles['home-p2']}>
                    <h2>Define</h2>
                    <p>Your personal study plan evolves continually as you learn. Using a research-based methodology and regular micro challenges to measure your progress, Bhasha Buddy helps you to efficiently close gaps in your knowledge and build on what you know.</p>
                </div>
                <div className={styles['home-p3']}>
                    <h2>Develop</h2>
                    <p>Get immediate feedback on how to improve so that you're always learning new stuff and always progressing. Plus, challenging kwizzes, engaging exercises, and leaderboards keep you motivated and inspired.</p>
                </div>
            </article>

            <div className={styles['home-hero-section']}>
                <div className={styles['home-hero1']}>
                    <div className={styles['home-hero-lp']}>
                        <img src={tog} alt="" />
                    </div>
                    <div className={styles['home-hero-rp']}>
                        <h2>Learn more together</h2>
                        <p>"Go beyond the textbook" encourages learners to explore knowledge beyond what is typically found in traditional learning materials. By venturing beyond the confines of textbooks, individuals have the opportunity to delve deeper into subjects, gaining a richer understanding of the material. By embracing a multifaceted approach to learning, individuals can engage with diverse perspectives and gain a broader understanding of the topic at hand.</p>
                    </div>
                </div>


                <div className={styles['home-hero2']}>
                    <div className={styles['home-hero-lp']}>
                        <img src={con} alt="" />
                    </div>
                    <div className={styles['home-hero-rp']}>
                        <h2>Learn with confidence</h2>
                        <p>Go beyond the textbook. Practice pronunciation, gain cultural insights and exchange local language tips with our global community of learners.Here, within our immersive platform, you'll not only absorb knowledge but also refine your pronunciation skills, delve into the intricacies of diverse cultures, and exchange invaluable language tips with a vibrant global community of fellow learners.</p>
                    </div>
                </div>


                <div className={styles['home-hero3']}>
                    <div className={styles['home-hero-lp']}>
                        <img src={rea} alt="" />
                    </div>
                    <div className={styles['home-hero-rp']}>
                        <h1>Learn for real life</h1>
                        <p>Say goodbye to outdated phrases and hello to skills that take you places. Learn language for every day with regularly updated content, video flashcards with real people and helpful cultural insights.Embark on a transformative journey with our immersive language learning experience, designed to equip you with the skills essential for real-life interactions. Bid farewell to outdated phrases and welcome a new era of language .</p>
                    </div>
                </div>
            </div>

            <div className={styles['home-learners-kind']}>
                <div className={styles['home-upper']}>
                    <h1>For all kind of learners</h1>
                </div>
                <div className={styles['home-lower']}>
                    <div className={styles['home-lp']}>
                        <p> <b>Travelers</b> seek fluency for meaningful connections and cultural immersion. <br />
                            <b>Expats</b> aim to integrate into new communities and navigate daily life.<br />
                            <b>Test-takers</b> strive for improved scores and overall language proficiency.<br />
                            <b>Enthusiasts</b> enjoy mastering grammar and exploring new cultures.<br />
                            <b>Relationship builders</b> seek confidence in discussing everyday topics and understanding cultural.</p>
                    </div>
                    <div className={styles['home-rp']}>
                        <img src={all} alt="" />
                    </div>
                </div>

            </div>

            <footer>
                <h2>Bhasha Buddy</h2>
                <p>all rights reserved@2024</p>
            </footer>
        </div>
    );
};

export default BhashaHomePage;
