import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Blog.module.css'; // Importing the CSS module
import publish from './images/publish blog.svg'

function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const email = localStorage.getItem('email');
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const handleNavigation = (route) => {
        navigate(route); // Use navigate to navigate to the specified route
    };
    // const email = "user@example.com"; 

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    //function to request the data
    const fetchBlogPosts = async () => {
        try {
            const url = 'http://127.0.0.1:5000/blogs';
            const requestData = { "email": email };
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


    //to handle the click when user clicks on the blog   
    const handlePostClick = (title) => {
        navigate('/blog/post', { state: { title: title } });
    };

    return (
        <div className={styles['blog-outer-container']}>
            <nav className={styles['blog-nav']}>
                <h1>Bhasha Buddy Blogs</h1>
                <span>Become fluent in any language</span>
            </nav>
            <div className={styles['blog-container']}>

                <div id="blog-posts" className={styles['blog-posts']}>
                    {blogPosts && Array.isArray(blogPosts) && blogPosts.length > 0 && blogPosts.map(post => (
                        <div className={styles['blog-post']} key={post._id} onClick={() => handlePostClick(post.title)}>

                            <div className={styles['blog-lp']}>
                                {/* <img src={img} alt={post.title} /> */}
                                {/* <img src={post.image} alt={post.title} /> */}
                                <img style={{ width: '700px', borderRadius: '10px' }} src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />
                            </div>
                            
                            <div className={styles['blog-rp']}>
                                <h2>{post.writer_name}</h2>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                {/* <p>{post.content.substring(0, 25)}{post.content.length > 25 ? '...' : ''}</p> */}

                            </div>
                        </div>
                    ))}
                    {(blogPosts.length === 0) && <p>No blog posts found.</p>}
                </div>
                <div className={styles['publish-container']}>
                    <img src={publish} alt="" className={styles['publish-image']} />
                    <div className={styles['publish-text']}>
                        <p>Get featured On Bhasha buddy</p>
                        <p style={{ fontSize: '0.7em' }}>write your own blog now</p>
                        <button onClick={() => handleNavigation('/createBlog')}>Publish Now</button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default BlogPage;
