import React, { useState, useEffect } from "react";
import axios from "axios";
// import '../assets/style/community.css';


function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = async () => {
    // const email = localStorage.getItem('email')

    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000//community/posts");
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




const handleLike = async (postId) => {
  try {
      const response = await axios.post("http://127.0.0.1:5000/community/like", { post_id: postId });
      if (response.status === 200) {
          const updatedPosts = posts.map((post) =>
              post.post_id === postId ? { ...post, likes: post.likes + 1 } : post
          );
          setPosts(updatedPosts);
      } else {
          console.error("Error updating likes. Unexpected status:", response.status);
      }
  } catch (error) {
      console.error("Error updating likes:", error);
  }
};

const handleDislike = async (postId) => {
  try {
      const response = await axios.post("http://127.0.0.1:5000/community/dislike", { post_id: postId });
      if (response.status === 200) {
          const updatedPosts = posts.map((post) =>
              post.post_id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
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
            posts.map((post) => (
              <div className="post" key={post.id}>
                <p>{post.post_time}</p>
                <img src={post.profileImage} alt="Profile" />
                <p>{post.creator_name}</p>
                <p>{post.content}</p>
                <button onClick={() => handleLike(post.id)}>Like</button>
                <span>{post.likes}</span>
                <button onClick={() => handleDislike(post.id)}>Dislike</button>
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