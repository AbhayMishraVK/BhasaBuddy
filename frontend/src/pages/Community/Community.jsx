import React, { useState, useEffect } from "react";
import axios from "axios";
// import '../assets/style/community.css';


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
        console.log(response)
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

      // Retrieve email from local storage
      const email = localStorage.getItem('email');
      console.log(email)

      try {
        // Make POST request with email and new post content
        const response = await axios.post("http://127.0.0.1:5000/community/post", { email: email, content: newPostContent });
        
        // Check if the status code is 201
        if (response.status === 201) {
          // Clear the new post content after successful submission
          setNewPostContent("");
          // Refresh posts after new post submission
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
    <div className="community-page">
      <h1>Community Page</h1>

      {/* New Post Form */}
      <form className="new-post-form" onSubmit={handleNewPostSubmit}>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your post..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      {/* Posts */}
      <div className="posts">
        <div className="posts-grid">
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts.map((post, index) => (
              <div className="post" key={post.id}>
                <p>{post.post_time}</p>
                <img src={`data:image/jpeg;base64,${post.profileImage}`} alt="Profile" />
                <p>{post.creator_name}</p>
                <p>{post.content}</p>
                <button onClick={() => handleLike(post.post_id, index)} disabled={disabledButtons.includes(index)}>Like</button>
                <span>{post.likes}</span>
                <button onClick={() => handleDislike(post.post_id, index)} disabled={disabledButtons.includes(index)}>Dislike</button>
                <span>{post.dislikes}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default CommunityPage;
