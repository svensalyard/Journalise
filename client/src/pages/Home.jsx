import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMatchups } from '../utils/api';

// Uncomment import statements below after building queries and mutations
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
function Journalise() {
  const [comments, setComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');

    if (enteredUsername === 'demo' && enteredPassword === 'demo') {
      setUsername(enteredUsername);
      setPassword(enteredPassword);
      setLoggedIn(true);
      event.target.reset();
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newComment = {
      bookTitle: formData.get('bookTitle'),
      comment: formData.get('comment'),
      username: username,
      date: new Date().toLocaleDateString()
    };
    setComments([...comments, newComment]);
    event.target.reset();
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <ul>
            <li><a href="#">Popular</a></li>
            <li><a href="#">Categories</a></li>
          </ul>
        </div>
        <div className="navbar-center">
          <h1>Journalise</h1>
        </div>
        <div className="navbar-right">
          {!loggedIn ? (
            <button onClick={handleLogin}>Sign-Up/Login</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="bookTitle">Book Title:</label>
            <input type="text" id="bookTitle" name="bookTitle" required />
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" required></textarea>
            <button type="submit">Add Comment</button>
          </form>
          <hr />
          <h3>Book Comments Feed:</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <h4>{comment.bookTitle}</h4>
                <p>Comment: {comment.comment}</p>
                <p>Username: {comment.username}</p>
                <p>Date: {comment.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Journalise;
