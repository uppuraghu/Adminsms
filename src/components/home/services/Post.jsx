import React, { useState, useEffect } from "react";
import { FaRegSmile, FaEllipsisH, FaTimes } from "react-icons/fa";
import Picker from "emoji-picker-react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/profil.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import '.././../../App.css'

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(null);
    const [postData, setPostData] = useState({
        username: "",
        specialist: "",
        description: "",
        emoji: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); // Track authenticated user

    // Firebase Auth: Check user authentication status
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Optionally set username from Firebase user data
                setPostData((prev) => ({
                    ...prev,
                    username: currentUser.displayName || currentUser.email.split('@')[0],
                }));
            } else {
                setError("Please log in to access this feature.");
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch posts from backend (only if user is authenticated)
    useEffect(() => {
        if (!user) return; // Skip if user is not authenticated

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
    }, [user]); // Re-fetch when user changes

    // Handle Post Submission (only if user is authenticated)
    const handlePost = async () => {
        if (!user) {
            setError("Please log in to create a post.");
            return;
        }

        setError(null);

        if (!postData.username || !postData.specialist) {
            setError("Please enter your name and select a specialist");
            return;
        }

        if (!postData.description) {
            setError("Please add a description");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('username', postData.username);
            formData.append('specialist', postData.specialist);
            formData.append('description', postData.description);
            formData.append('emoji', postData.emoji);

            const response = await fetch('http://localhost:5000/post/submit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to submit post');

            const result = await response.json();
            setPosts(prevPosts => [result.post, ...prevPosts]);

            setPostData({
                username: user.displayName || user.email.split('@')[0], // Retain username
                specialist: "",
                description: "",
                emoji: "",
            });
            setModalOpen(false);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error("Error adding post:", error);
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onEmojiClick = (emojiObject) => {
        setPostData(prev => ({
            ...prev,
            emoji: (prev.emoji || "") + emojiObject.emoji
        }));
        setShowEmojiPicker(false);
    };

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
                {showPopup && (
                    <div className="notification notification-success">
                        🎉 Post successfully created!
                    </div>
                )}

                <div className="post-container">
                    <div className="post-header">
                        <img src={prf1} alt="Profile" className="profile-img" />
                        <input
                            type="text"
                            placeholder="Start a post"
                            className="post-input"
                            onClick={() => setModalOpen(true)}
                            readOnly
                        />
                    </div>
                    <div className="post-actions">
                        <button
                            className="action-btn"
                            onClick={() => setModalOpen(true)}
                        >
                            <img src={prf} alt="Media" className="action-icon" />
                            <span>Media</span>
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => setModalOpen(true)}
                        >
                            <img src={cal} alt="Event" className="action-icon" />
                            <span>Event</span>
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => setModalOpen(true)}
                        >
                            <img src={art} alt="Write Article" className="action-icon" />
                            <span>Write article</span>
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                    setShowEmojiPicker(false);
                                }}
                                className="close-btn"
                            >
                                <FaTimes className="icon-close" />
                            </button>

                            <h1 className="modal-title">Create a Post</h1>

                            <div className="modal-input-group">
                                <img src={prf} alt="Profile" className="profile-img" />
                                <input
                                    type="text"
                                    placeholder="Enter your Name"
                                    value={postData.username}
                                    onChange={(e) =>
                                        setPostData((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }))
                                    }
                                    className="text-input"
                                />
                            </div>

                            <select
                                value={postData.specialist}
                                onChange={(e) =>
                                    setPostData((prev) => ({
                                        ...prev,
                                        specialist: e.target.value,
                                    }))
                                }
                                className="select-input"
                            >
                                <option value="">Select Specialist</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Lawyer">Lawyer</option>
                                <option value="Banking">Banking</option>
                                <option value="Others">Others</option>
                            </select>

                            <textarea
                                rows="4"
                                placeholder="Add a description..."
                                value={postData.description}
                                onChange={(e) =>
                                    setPostData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                className="textarea-input"
                            />

                            <div className="emoji-container">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="emoji-btn"
                                >
                                    <FaRegSmile className="emoji-icon" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Click to add emoji"
                                    value={postData.emoji}
                                    readOnly
                                    className="emoji-input"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                />
                                {showEmojiPicker && (
                                    <div className="emoji-picker">
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </div>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button
                                    onClick={() => {
                                        setModalOpen(false);
                                        setShowEmojiPicker(false);
                                    }}
                                    className="btn btn-cancel"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePost}
                                    className="btn btn-post"
                                    disabled={loading}
                                >
                                    {loading ? "Posting..." : "Post"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="post-feed">
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
                                {post.imageUrl && (
                                    <img
                                        src={`http://localhost:5000${post.imageUrl}`}
                                        alt="Post content"
                                        className="post-image"
                                    />
                                )}
                                {post.emoji && <p className="post-emoji">{post.emoji}</p>}

                                <div className="post-footer">
                                    <span>{post.timestamp}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-feed">
                            <p>
                                {posts.length === 0
                                    ? "No posts yet. Be the first to post!"
                                    : "No posts found."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Post;