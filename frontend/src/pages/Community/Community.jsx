import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './community.module.css'; // Import CSS module
import profile from './images/profile.jpg';
import communityImage from './images/community.png';

function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState([]);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/community/posts");
      if (response.status === 200) {
        setPosts(response.data.posts);
      } else {
        console.error("Error fetching posts. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const email = localStorage.getItem('email');

    try {
      const response = await axios.post("http://127.0.0.1:5000/community/post", { email: email, content: newPostContent });
      if (response.status === 201) {
        setNewPostContent("");
        fetchPosts();
      } else {
        console.error("Error submitting new post. Unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting new post:", error);
    }
  };

  const handleLike = async (postId, index) => {
    try {
      setDisabledButtons([...disabledButtons, index]);
      const response = await axios.post("http://127.0.0.1:5000/community/like", { post_id: postId });
      if (response.status === 200) {
        const updatedPosts = posts.map((post, i) =>
          i === index ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
      } else {
        console.error("Error updating likes. Unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDislike = async (postId, index) => {
    try {
      setDisabledButtons([...disabledButtons, index]);
      const response = await axios.post("http://127.0.0.1:5000/community/dislike", { post_id: postId });
      if (response.status === 200) {
        const updatedPosts = posts.map((post, i) =>
          i === index ? { ...post, dislikes: post.dislikes + 1 } : post
        );
        setPosts(updatedPosts);
      } else {
        console.error("Error updating dislikes. Unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  return (
    <div className={styles["comm-container"]}> {/* Apply CSS module class */}
      <div className={styles["comm-community-page"]}> {/* Apply CSS module class */}
        <h1>Community Page</h1>

        <div className={styles["comm-top"]}> {/* Apply CSS module class */}
          <form className={styles["comm-new-post-form"]} onSubmit={handleNewPostSubmit}> {/* Apply CSS module class */}
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write your post..."
              style={{ height: '70px' }}
            ></textarea>
            <button type="submit">Submit</button>
          </form>

          <img style={{ height: '170px', display: 'inline' }} src={communityImage} alt="" />
        </div>

        <div className={styles["comm-posts"]}> {/* Apply CSS module class */}
          <div className={styles["comm-posts-grid"]}> {/* Apply CSS module class */}
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              posts.map((post,index) => (
                <div className={styles["comm-post"]} key={post.id}> {/* Apply CSS module class */}
                  <p>{post.post_time}</p>

                  <div className={styles["comm-upper"]}> {/* Apply CSS module class */}
                    <div className={styles["comm-lp"]}> {/* Apply CSS module class */}
                      <img src={`data:image/jpeg;base64,${post.profileImage}`} alt="Profile" />
                    </div>

                    <div className={styles["comm-rp"]}> {/* Apply CSS module class */}
                      <h2>{post.creator_name}</h2>
                      <p>{post.content}</p>
                    </div>
                  </div>

                  <div className={styles["comm-lower"]}> {/* Apply CSS module class */}
                    <button onClick={() => handleLike(post.id,index) } disabled={disabledButtons.includes(index)} className={styles["comm-button"]}>Like<span style={{ marginLeft: '5px' }}>{post.likes}</span></button>
                    <button onClick={() => handleDislike(post.id,index)} disabled={disabledButtons.includes(index)} className={styles["comm-button"]}>Dislike<span style={{ marginLeft: '5px' }}>{post.dislikes}</span></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
