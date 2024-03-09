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
    setLoading(true);
    try {
      const response = await axios.get("backend-url/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      await axios.post("backend-url/posts", { content: newPostContent });
      setNewPostContent("");
      fetchPosts(); // Refresh posts after new post submission
    } catch (error) {
      console.error("Error submitting new post:", error);
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
                <img src={post.profileImage} alt="Profile" />
                <p>{post.userName}</p>
                <p>Learning {post.language}</p>
                <p>{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

}

export default CommunityPage;
