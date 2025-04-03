import React, { useState, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import prf1 from "../../images/profil.png";
import '.././../App.css';
import emailjs from '@emailjs/browser'; // Import emailjs

const Adminpost = () => {
    const [posts, setPosts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                setError("Please log in to access this feature.");
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const postsData = await response.json();
                setPosts(postsData);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [user]);

    const handleDelete = async (postId) => {
        if (!user) {
            setError("Please log in to delete a post.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/post/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete post');

            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = (post) => {
        // EmailJS integration
        const templateParams = {
            to_email: post.email, // Assuming your post object has an 'email' field
            username: post.username,
            message: 'Your application has been accepted!',
        };

        emailjs.send('service_h7log1r', 'template_reqyq74', templateParams, '4M9NBDeam5qtZtWYb')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Email sent successfully!');
            }, (err) => {
                console.error('FAILED...', err);
                alert('Failed to send email. Please try again.');
            });
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Please log in to access this feature.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="content-wrapper">
                {loading && (
                    <div className="notification notification-loading">
                        Processing...
                    </div>
                )}
                {error && (
                    <div className="notification notification-error">
                        {error}
                    </div>
                )}
                <div className="post-feed">
                    <h1 className="text-2xl font-bold ml-40">Well-Come to <span className="text-blue-500">Admin</span> page</h1>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <img src={prf1} alt="Profile" className="profile-img" />
                                    <div className="post-info">
                                        <h3 className="post-username">{post.username}</h3>
                                        <p className="post-specialist">{post.specialId}</p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowDropdown(
                                                showDropdown === post.id ? null : post.id
                                            )
                                        }
                                        className="menu-btn"
                                    >
                                        <FaEllipsisH />
                                    </button>
                                    {showDropdown === post.id && (
                                        <div className="dropdown-menu">
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="dropdown-item"
                                            >
                                                Delete Post
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <p className="post-description">{post.description}</p>
                                {post.emoji && <p className="post-emoji">{post.emoji}</p>}

                                <div className="post-footer">
                                    <span>{post.timestamp}</span>
                                    <button
                                        onClick={() => handleAccept(post)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-feed">
                            <p>
                                {posts.length === 0
                                    ? "No posts yet."
                                    : "No posts found."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Adminpost;