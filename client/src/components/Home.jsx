import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Add this line
import { AuthContext } from '../context/AuthContext';

function Journalise() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
      username: user.username,
      date: new Date().toLocaleDateString()
    };
    setPosts([...posts, newPost]);
    event.target.reset();
  };

  return (
    <div className="container">
      <h1>Welcome to Journalise</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
            <label htmlFor="content">Content:</label>
            <textarea id="content" name="content" required></textarea>
            <button type="submit">Post</button>
          </form>
          <hr />
          <h3>Journal Feed:</h3>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <p>By: {post.username}</p>
                <p>On: {post.date}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Please <Link to="/login">login</Link> to post and view journal entries.</div>
      )}
    </div>
  );
}

export default Journalise;
