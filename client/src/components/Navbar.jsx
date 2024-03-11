import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Journalise</Link>
      <div className="nav-links">
        <Link to="/search" className="nav-link">Search</Link>
        {isLoggedIn ? (
          <>
            <button onClick={logout} className="nav-link btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


