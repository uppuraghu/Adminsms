import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/rag.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import '.././../../App.css';
import { FaChevronDown } from "react-icons/fa";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [visibility, setVisibility] = useState("Anyone");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    
    const [postData, setPostData] = useState({
        username: "Raghu",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setPostData((prev) => ({
                    ...prev,
                    username: "Raghu", // Hardcoded
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

    const handlePost = async () => {
        if (!user) {
            setError("Please log in to create a post.");
            return;
        }

        setError(null);

        if (!postData.description) {
            setError("Please add a description");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('username', postData.username);
            formData.append('description', postData.description);

            const response = await fetch('http://localhost:5000/post/submit', {
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
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error("Error adding post:", error);
            setError("Failed to create post. Please try again.");
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

    const handleSelect = (option) => {
        setVisibility(option);
        setShowDropdown(false);
      };
    return (
        <div className="container">
            <div className="content-wrapper">
                {loading && <div className="notification notification-loading">Processing...</div>}
                {error && <div className="notification notification-error">{error}</div>}
                {showPopup && <div className="notification notification-success">Post successfully created!</div>}

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
          Raghu Ram<FaChevronDown size={14} style={{ marginLeft: 6 }} />
        </div>

        {/* Dropdown content */}
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



        {/* Show selected option below name */}
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
                                        src={`http://localhost:5000${post.imageUrl}`}
                                        alt="Post content"
                                        className="post-image"
                                    />
                                )}
                                <div className="post-footer">
                                    <span>{post.timestamp}</span>
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
