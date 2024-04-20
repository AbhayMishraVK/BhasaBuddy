import React, { useState } from 'react';
import axios from 'axios';
import styles from './createBlog.module.css'; // Import CSS module file for styling

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        writer_name: '',
        image: '',
        language: '',
        email: localStorage.getItem('email') || '' // Retrieve email from local storage
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // Handling image upload
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };

            if (file) {
                reader.readAsDataURL(file); // Read the file as a data URL
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/create/blogs', formData);
            setMessage('success');
            setFormData({
                title: '',
                content: '',
                writer_name: '',
                image: '',
                language: '',
                email: localStorage.getItem('email') || ''
            });
            setError('');
        } catch (error) {
            setError('Failed to create blog. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className={styles.crbBlogOuterCont}>
            <div className={styles.crbCreateBlogContainer}>
                <h1>Create a New Blog</h1>
                <form onSubmit={handleSubmit} className={styles.crbBlogForm}>
                    <div className={styles.crbFormGroup}>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className={styles.crbFormGroup}>
                        <label>Content:</label>
                        <textarea name="content" value={formData.content} onChange={handleChange} required />
                    </div>
                    <div className={styles.crbFormGroup}>
                        <label>Writer's Name:</label>
                        <input type="text" name="writer_name" value={formData.writer_name} onChange={handleChange} required />
                    </div>
                    <div className={styles.crbFormGroup}>
                        <label>Image:</label>
                        <input type="file" name="image" accept=".jpg, .jpeg" onChange={handleChange} required />
                    </div>
                    <div className={styles.crbFormGroup}>
                        <label>Language:</label>
                        <input type="text" name="language" value={formData.language} onChange={handleChange} required />
                    </div>

                    <button type="submit" className={styles.crbSubmitButton}>Submit</button>
                </form>
                {message && <p className={styles.crbSuccessMessage}>{message}</p>}
                {error && <p className={styles.crbErrorMessage}>{error}</p>}
            </div>
        </div>
    );
};

export default CreateBlog;