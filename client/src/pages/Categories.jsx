import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text, Button } from '@chakra-ui/react';

function Journalise() {
	const { isLoggedIn, logout, } = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  setCategory((prevCategory) => [...prevCategory]);

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
        <div>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    {category.map((category, index) => (
  <Card key={index}>
    <CardHeader>
      <Heading size='md'>{category.name}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{category.description}</Text>
    </CardBody>
    <CardFooter>
      <Button><Link to="/category/?">View Here</Link></Button>
    </CardFooter>
  </Card>
    ))}
</SimpleGrid>
    </div>
        </div>
      ) : (
        <div>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to post comments.</div>
      )}
    <div>
    </div>
  </div>



	);
}

export default Journalise;
