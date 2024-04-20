import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './BlogPost.css';

const BlogPost = () => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();


    const fetchBlog = async () => {
        setIsLoading(true);
        const title = location.state ? location.state.title : null;
        const payload = {
            'title': title // Assuming title is defined somewhere in your component
        };

        try {
            // const response = await axios.get(/oneBlog?title=${title});
            const response = await axios.get('http://127.0.0.1:5000/oneBlog', payload);
            console.log(response)
            if (response.data.status === 200) {
                setBlog(response.data.blog);
                setError(null);
            } else {
                setError(response.data.error);
                setBlog(null);
            }
        } catch (error) {
            setError('Something went wrong');
            setBlog(null);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="One-post-container">
            <div className="one-post-blog-post">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : blog ? (
                    <div className="one-post-blog-content">
                        <h1>{blog.title}</h1>
                        <p>Publlished by: {blog.writer_name}</p>
                        <p>Language: {blog.language}</p>
                        <img src={blog.image} alt={'image'} />
                        <p>{blog.content}</p>
                    </div>
                ) : (
                    <p>No blog found</p>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
