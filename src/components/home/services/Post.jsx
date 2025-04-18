import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/rag.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import ".././../../App.css";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [visibility, setVisibility] = useState("Anyone");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postData, setPostData] = useState({
        username: "Raghu",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [connectInputs, setConnectInputs] = useState({});
    const [activeConnectPostId, setActiveConnectPostId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setPostData((prev) => ({
                    ...prev,
                    username: "Raghu", // Hardcoded username
                }));
            } else {
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
                const response = await fetch('http://localhost:3000/posts');
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

    const handlePost = async () => {
        if (!user) {
            setError("Please log in to create a post.");
            return;
        }

        setError(null);

        if (!postData.description) {
            toast.error("Please add a description");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('username', postData.username);
            formData.append('specialist', 'default');
            formData.append('description', postData.description);

            const response = await fetch('http://localhost:3000/post/submit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to submit post');

            const result = await response.json();
            setPosts(prevPosts => [result.post, ...prevPosts]);

            setPostData({
                username: "Raghu",
                description: "",
            });
            setModalOpen(false);

            toast.success("Post successfully created!");
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (option) => {
        setVisibility(option);
        setShowDropdown(false);
    };

    const toggleConnect = (postId) => {
        if (activeConnectPostId === postId) {
            setActiveConnectPostId(null); // Close if already open
        } else {
            setActiveConnectPostId(postId); // Open for clicked post
        }
    };

    const handleConnectChange = (postId, value) => {
        setConnectInputs((prev) => ({
            ...prev,
            [postId]: value,
        }));
    };

    const handleConnectSubmit = (postId) => {
        const message = connectInputs[postId];
        if (message && message.trim()) {
            console.log(`Connection request to post ${postId}:`, message);
            toast.success("Connection message sent!");
            setConnectInputs((prev) => ({
                ...prev,
                [postId]: "",
            }));
            setActiveConnectPostId(null);
        } else {
            toast.error("Please write a message before sending.");
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
                {loading && <div className="notification notification-loading">Processing...</div>}
                {error && <div className="notification notification-error">{error}</div>}

                {/* Post Input Section */}
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
                        <button className="action-btn" onClick={() => setModalOpen(true)}>
                            <img src={prf} alt="Media" className="action-icon" />
                            <span>Media</span>
                        </button>
                        <button className="action-btn" onClick={() => setModalOpen(true)}>
                            <img src={cal} alt="Event" className="action-icon" />
                            <span>Event</span>
                        </button>
                        <button className="action-btn" onClick={() => setModalOpen(true)}>
                            <img src={art} alt="Write Article" className="action-icon" />
                            <span>Write article</span>
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button onClick={() => setModalOpen(false)} className="close-btn">
                                <FaTimes className="icon-close" />
                            </button>

                            <div className="modal-input-group">
                                <img src={prf1} alt="Profile" className="profile-img" />
                                <div className="text-section">
                                    <div
                                        className="text-display font-bold dropdown-toggle"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        Raghu Ram <FaChevronDown size={14} style={{ marginLeft: 6 }} />
                                    </div>

                                    {showDropdown && (
                                        <div className="dropdown-overlay">
                                            <div className="dropdown-menu">
                                                <div className="dropdown-header">
                                                    <h1>Post Settings</h1>
                                                    <span className="close-icon" onClick={() => setShowDropdown(false)}>×</span>
                                                </div>
                                                <hr />
                                                <p>Who can see your post?</p>
                                                <div className="dropdown-option" onClick={() => handleSelect("Anyone")}>Anyone</div>
                                                <div className="dropdown-option" onClick={() => handleSelect("Connections Only")}>Connections Only</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="visibility-option">{visibility}</div>
                                </div>
                            </div>

                            <textarea
                                rows="8"
                                placeholder="What do you want to talk about?"
                                value={postData.description}
                                onChange={(e) =>
                                    setPostData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                className="textarea-input"
                            />

                            <div className="modal-actions">
                                <button
                                    onClick={handlePost}
                                    className={`btn btn-post ${postData.description.trim() ? "active" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Posting..." : "Post"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Posts Feed */}
                <div className="post-feed">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <img src={prf1} alt="Profile" className="profile-img" />
                                    <div className="post-info">
                                        <h3 className="post-username">{post.username}</h3>
                                    </div>
                                </div>
                                <p className="post-description">{post.description}</p>
                                {post.imageUrl && (
                                    <img
                                        src={`http://localhost:3000${post.imageUrl}`}
                                        alt="Post content"
                                        className="post-image"
                                    />
                                )}
                                <div className="post-footer">
                                    <span>{post.timestamp}</span>
                                </div>

                                {/* Connect Section */}
                                <div className="connect-section">
                                    <button
                                        className="btn-connect"
                                        onClick={() => toggleConnect(post.id)}
                                    >
                                        {activeConnectPostId === post.id ? "Cancel" : "Connect"}
                                    </button>

                                    {activeConnectPostId === post.id && (
                                        <div className="connect-input-box">
                                            <textarea
                                                rows="3"
                                                placeholder="Write a message..."
                                                value={connectInputs[post.id] || ""}
                                                onChange={(e) => handleConnectChange(post.id, e.target.value)}
                                                className="textarea-connect"
                                            />
                                            <button
                                                className="btn btn-submit-connect"
                                                onClick={() => handleConnectSubmit(post.id)}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-feed">
                            <p>No posts yet. Be the first to post!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;
