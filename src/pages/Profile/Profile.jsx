import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import watch from './images/watch.svg';
import diamond from './images/diamond.svg';
import gold from './images/gold-medal.svg';
import voc from './images/book.svg';




function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
        const email = localStorage.getItem('email')
        axios.post("http://127.0.0.1:5000/user/dashBoard", {
            "email": email
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const responseData = response.data;
                console.log(responseData)
                if (responseData.Status === 200) {
                    setUserProfile(responseData);
                } else {
                    setError(responseData.error || "Unknown error occurred");
                }
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
                setError("Error fetching user profile. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userProfile) return null;

    return (
        <div className={styles['profile-outer-container']}>
            <h1 id={styles['profile-nav']}>Profile</h1>
            <div className={styles['profile-container']}>
                <UserProfile userProfile={userProfile} />
            </div>
        </div>
    );
}


function UserProfile({ userProfile }) {
    const { user_details, user_course_info, streak_diamond } = userProfile;

    return (
        <>
            <UserDetails userDetails={user_details} />
            <UserCourseInfo userCourseInfo={user_course_info} />
            <UserStreak userStreak={streak_diamond} />
        </>
    );
}


//section -1 starts here
function UserDetails({ userDetails }) {
    return (
        <section className={styles['profile-sec']} id={styles['profile-userDetails']}>
            <img style={{ width: '150px', borderRadius: '100px' }} id={styles['profile-profile-image']} src={require('./images/girl.png')} alt="" />
            <span id={styles['profile-name']}>{userDetails.name}</span>
            <div>Account</div>
            <span style={{ overflowWrap: 'break-word' }} id={styles['profile-email']}>{userDetails.email}</span>
            <div>Joined on</div>
            <span id={styles['profile-date']}>{userDetails.joined}</span>
            <div>Language</div>
            <span id={styles['profile-Lang']}>{userDetails.regional_language}</span>
            <div>Age</div>
            <span id={styles['profile-Age']}>{userDetails.age || "Not Specified"}</span>
        </section>
    );
}

//section-1 ends here

// section-2 starts
function UserCourseInfo({ userCourseInfo }) {
    return (
        <section className={styles['profile-sec']} id={styles['profile-userCourseInfo']}>

            {/* section-2 part-1 */}
            <div className={`${styles['profile-flex']} ${styles['profile-currently-learning-section']}`}>
                <div className={styles['profile-lp']}>
                    <h2>You are currently learning</h2>
                    <h4 style={{ marginTop: '20px' }} id={styles['profile-tutorial-name']}>{userCourseInfo.course_name}</h4>
                </div>
                <div className={styles['profile-rp']}>
                    <img style={{ height: '100px', borderRadius: '10px' }} id={styles['profile-tutorial-image']} src={require('./images/book.jpeg')} alt="book-image" />
                    <p id={styles['profile-lesson']}>lessson-1</p>
                </div>
            </div>
            {/* section-2 part-2 */}
            <div className={styles['profile-progress']}>
                <div className={styles['profile-prg-lp']}>
                    <h2>Learning progress</h2>
                    <div style={{ marginLeft: '30px', display: 'inline-block', verticalAlign: 'middle', marginRight: '5px', fontSize: '2em', fontWeight: '900' }} id={styles['profile-lessons-completed']}>{userCourseInfo.completed_lectures}</div>
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', fontSize: '2em', fontWeight: '900' }} id={styles['profile-total-lessons']}>/{userCourseInfo.total_lectures}</span>
                    <h2 style={{ marginTop: '10px' }}>Lessons Completed</h2>
                </div>
                <div className={styles['profile-prg-rp']}>
                    <div id={styles['profile-percentage-completed']}>{userCourseInfo.percentage_completed}</div>
                </div>
            </div>
            {/* section-2 part-3 */}
            <div className={`${styles['profile-time-spent']} ${styles['profile-flex']}`}>
                <div className={styles['profile-time-lp']}>
                    <span>Vocabulary</span>
                    <div className={styles['profile-inner']}>
                        <img style={{ height: '40px', marginTop: '10px' }} src={voc} alt="" />
                        <span id={styles['profile-no']}>{userCourseInfo.vocabulary}</span>
                    </div>
                </div>
                <div className={styles['profile-time-rp']}>
                    <span>Time Spent</span>
                    <div className={styles['profile-t-inner']}>
                        <div style={{ marginTop: '20px' }}>
                            <img style={{ height: '40px' }} src={watch} alt="" />
                            <span style={{ float: 'inline-end', marginTop: '5px', marginLeft: '30px' }} id={styles['profile-hours']}>
                                {userCourseInfo.total_time_spent}<span>hrs</span>
                            </span>
                        </div>
                        <p>Practice Set</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// section-2 ends


// section-3 starts

function UserStreak({ userStreak }) {
    const { seven_day_streak, current_streak, max_streak, total_days, total_diamond } = userStreak;

    const getBackgroundColor = (streakValue) => {
        if (streakValue === 1) {
            return '#2cac31';
        } else if (streakValue === 0) {
            return 'red';
        } else {
            return 'white';
        }
    };

    return (
        <section className={styles['profile-sec']} id={styles['profile-userStreak']}>

            {/* section -3 part-1 starts*/}
            <div id={styles['profile-streak-part']}>


                <div className={styles['profile-stk-upr']}>
                    <div id={styles['profile-current-streak']}>
                        <p>Current Streak</p>
                        <div id={styles['profile-cs-days']}>{current_streak}</div>
                        <p>Days</p>
                    </div>
                    <div id={styles['profile-best-streak']}>
                        <strong>Best Streak</strong>
                        <div id={styles['profile-bs-days']}>{max_streak}</div>
                        <p>Days</p>
                    </div>
                    <div id={styles['profile-total-days']}>
                        <p>Total learning days</p>
                        <div>{total_days}<span>Days</span></div>
                    </div>
                </div>


                <div className={styles['profile-stk-lwr']}>
                    <div className={styles['profile-day-streak']}>
                        <p>Sun</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Sunday) }}>{seven_day_streak.Sunday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Mon</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Monday) }}>{seven_day_streak.Monday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Tue</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Tuesday) }}>{seven_day_streak.Tuesday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Wed</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Wednesday) }}>{seven_day_streak.Wednesday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Thu</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Thursday) }}>{seven_day_streak.Thursday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Frid</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Friday) }}>{seven_day_streak.Friday}</div>
                    </div>
                    <div className={styles['profile-day-streak']}>
                        <p>Satu</p>
                        <div className={styles['profile-day-streak-cnt']} style={{ backgroundColor: getBackgroundColor(seven_day_streak.Saturday) }}>{seven_day_streak.Saturday}</div>
                    </div>
                </div>

            </div>

            {/* section -3 part-1 ends*/}

            {/* section -3 part-2 starts*/}


            <div className={styles['profile-acheivement-part']}>
                <div className={styles['profile-ach-lp']}>
                    <h3>Achievements</h3>
                    <p>Gold</p>
                    <img style={{ height: '60px',marginTop:'30px' }} src={gold} alt="Gold Medal" />
                </div>
                <div className={styles['profile-ach-rp']}>
                    <h4>Total diamonds</h4>
                    <p id={styles['profile-tot-dia']}>{total_diamond}</p>
                    <img style={{ height: '60px',marginTop:'30px'}} src={diamond} alt="Diamond" />
                </div>
            </div>
            {/* section -3 part-2 starts*/}
        </section>
    );
}

export default Profile;
