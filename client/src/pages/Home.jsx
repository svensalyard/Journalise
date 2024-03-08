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

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setUsername(formData.get('username'));
    setLoggedIn(true);
    event.target.reset();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
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
    <div>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="bookTitle">Book Title:</label>
            <input type="text" id="bookTitle" name="bookTitle" required />
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" required></textarea>
            <button type="submit">Add Comment</button>
          </form>
          <hr />
          <h2>Book Comments Feed:</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <h3>{comment.bookTitle}</h3>
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