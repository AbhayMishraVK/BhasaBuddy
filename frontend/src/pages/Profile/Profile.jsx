import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import './Profile.css'

function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
        const email = "amcsevk@gmail.com"; //api endpoint
        axios.post("http://127.0.0.1:5000/user/dashBoard", {
            "email": email // Pass email directly in the data object
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const responseData = response.data; // Store the response data immediately
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
        <div className="outer-container">
            <h1 id='nav'>Profile</h1>
            <div className="container">
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

//first part of profile
function UserDetails({ userDetails }) {
    return (
        <section className="sec" id="userDetails">
            <img style={{ width: '150px', borderRadius: '100px' }} id="profile-image" src="./images/girl.png" alt="" />
            <span id="name">{userDetails.name}</span>
            <div>Account</div>
            <span style={{ overflowWrap: 'break-word' }} id="email">{userDetails.email}</span>
            <div>Joined on</div>
            <span id="date">{userDetails.joined}</span>
            <div>Language</div>
            <span id="Lang">{userDetails.regional_language}</span>
            <div>Age</div>
            <span id="Age">{userDetails.age || "Not Specified"}</span>
        </section>
    );
}



//second part of profile
function UserCourseInfo({ userCourseInfo }) {
    return (
        <section className="sec" id="userCourseInfo">
            <div className="flex currently-learning-section">
                <div className="lp">
                    <h2>You are currently learning</h2>
                    <h2 style={{ marginTop: '20px' }} id="tutorial-name">{userCourseInfo.course_name}</h2>
                </div>
                <div className="rp">
                    <img style={{ height: '100px', borderRadius: '10px' }} id="tutorial-image" src="./book.jpeg" alt="book-image" />
                    <p id="lesson"></p>
                </div>
            </div>

            <div className="progress">
                <div className="prg-lp">
                    <h2>Learning progress</h2>
                    <div style={{ fontSize: '2em', fontWeight: '900', margin: '0px' }} id="lessons-completed">{userCourseInfo.completed_lectures}</div>
                    <span id="total-lessons">(/){userCourseInfo.total_lectures}</span>
                    <h2 style={{ marginTop: '20px' }}>Lessons Completed</h2>
                </div>
                <div className="prg-rp">
                    <div id="percentage-completed">{userCourseInfo.percentage_completed}</div>
                </div>
            </div>

            <div className="time-spent flex">
                <div className="lp">
                    <span>Vocabulary</span>
                    <div className="inner">
                        <img style={{ height: '40px', marginTop: '10px' }} src="/images/book.svg" alt="" />
                        <span id="no">{userCourseInfo.vocabulary}</span>
                    </div>
                </div>
                <div className="rp">
                    <span>Time Spent</span>
                    <div className="t-inner">
                        <div style={{ marginTop: '10px' }}>
                            <img style={{ height: '40px' }} src="/images/watch.svg" alt="" />
                            <span style={{ float: 'inline-end', marginLeft: '30px' }} id="hours">
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

// third part of the profile

function UserStreak({ userStreak }) {

    const { seven_day_streak, current_streak, max_streak, total_days, total_diamond } = userStreak;


    return (
        <section className="sec" id="userStreak">
            <div id="streak-part">
                <div className="stk-upr">
                    <div id="current-streak">
                        <p>Current Streak</p>
                        <div id="cs-days">{current_streak}</div>
                        <p>Days</p>
                    </div>
                    <div id="best-streak">
                        <p>Best Streak</p>
                        <div id="bs-days">{max_streak}</div>
                        <p>Days</p>
                    </div>
                    <div id="total-days">
                        <p>Total learning days</p>
                        <div id="tot-dia">{total_days}<span>Days</span></div>
                    </div>
                </div>
                <div className="stk-lwr">
                    <div className="day-streak">
                        <p>Sun</p>
                        <div>{seven_day_streak.Sunday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Mon</p>
                        <div>{seven_day_streak.Monday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Tue</p>
                        <div>{seven_day_streak.Tuesday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Wed</p>
                        <div>{seven_day_streak.Wednesday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Thu</p>
                        <div>{seven_day_streak.Thursday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Fri</p>
                        <div>{seven_day_streak.Friday}</div>
                    </div>
                    <div className="day-streak">
                        <p>Sat</p>
                        <div>{seven_day_streak.Saturday}</div>
                    </div>
                </div>

            </div>
            <div className="acheivement-part">
                <div className="ach-lp">
                    <h3>Achievements</h3>
                    <p>Gold</p>
                    <img style={{ height: '60px' }} src="/images/gold-medal.svg" alt="Gold Medal" />
                </div>
                <div className="ach-rp">
                    <h4>Total diamonds</h4>
                    <p id="tot-dia">{total_diamond}</p>
                    <img style={{ height: '60px' }} src="/images/diamond.svg" alt="Diamond" />
                </div>
            </div>
        </section>
    );
}

export default Profile;