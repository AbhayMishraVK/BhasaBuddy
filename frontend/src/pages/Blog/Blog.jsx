import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blog.css';

function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const email = "user@example.com"; // Replace with actual user's email

    useEffect(() => {
        fetchBlogPosts();
    }, []);
 
    //function to request the data
    const fetchBlogPosts = async () => {
        try {
            const url = 'backend-url/posts';
            const requestData = { email: email };
            const response = await axios.post(url, requestData);
    
            if (response.status === 200) {
                setBlogPosts(response.data.blogs);
            } else {
                console.error('Error fetching blog posts. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };


    //function to send the title to the backend for a single post
    const sendTitleToBackend = (title) => {
        const data = { title: title };
        axios.post('backend-url/posts', data)
            .then(response => {
                console.log('Title sent to backend:', response.data);
            })
            .catch(error => {
                console.error('Error sending title to backend:', error);
            });
    };

     //to handle the click when user clicks on the blog   
    const handlePostClick = (title) => {
        sendTitleToBackend(title);
    };

    return (
        <div className="oouter-container">
            <div className="ccontainer">
                <nav className="nav">
                    <h1>Bhasha Buddy Blogs</h1>
                    <span>Become fluent in any language</span>
                </nav>
                <div id="blog-posts">
                    {blogPosts && Array.isArray(blogPosts) && blogPosts.length > 0 && blogPosts.map(post => (
                        <div className="post" key={post.id} onClick={() => handlePostClick(post.title)}>
                            <div className="lp">
                                <img src={post.image} alt={post.title} />                
                            </div>
                            <div className="rp">
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div> 
                        </div> 
                    ))}
                    {(blogPosts.length === 0) && <p>No blog posts found.</p>}
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
