import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Journalise() {
	const { isLoggedIn, logout, user } = useContext(AuthContext);
	const [comments, setComments] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const newComment = {
			bookTitle: formData.get("bookTitle"),
			comment: formData.get("comment"),
			username: user ? user.username : "Anonymous", // Adjust as needed
			date: new Date().toLocaleDateString(),
		};
		setComments((prevComments) => [...prevComments, newComment]);
		event.target.reset();
	};

	return (
	<div className="container">
		<nav className="navbar">
		<div className="navbar-left">
          <ul>
            <li><Link to="/popular">Popular</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/profile">Your Profile</Link></li>
          </ul>
        </div>
        <div className="navbar-center">
          <h1>Journalise</h1>
        </div>
        <div className="navbar-right">
          {!isLoggedIn ? (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </nav>
      
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
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
      ) : (
        <div>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to post comments.</div>
      )}
		
	</div>
	);
}

export default Journalise;
