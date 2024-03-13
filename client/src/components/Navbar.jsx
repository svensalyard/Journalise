import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul>
                    <li><Link to="/popular">Popular</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/profile">Your Profile</Link></li>
                </ul>
            </div>
            <div className="navbar-center">
                <h1><Link to="/">Journalise</Link></h1>
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
    );
}

export default Navbar;
