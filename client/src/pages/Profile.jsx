import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, CardHeader, CardBody, SimpleGrid, Heading, Text, Box,  Flex, Avatar } from "@chakra-ui/react";

function Journalise() {
	const { isLoggedIn, logout, user } = useContext(AuthContext);
    const [post, setPost] = useState([]);
    setPost((prevPost) => [...prevPost]);
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
          <h1 ><Link to="/">Journalise</Link></h1>
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
{user.map((user) => (
<Card maxW='md' key={user}>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

        <Box>
          <Heading size='sm'>{user.username}</Heading>
          <Text>Joined: {user.date}</Text>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
    {user.description}
    </Text>
  </CardBody>
</Card>
))}
</div>
    <div>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    {post.map((post, index) => (
  <Card key={index}>
    <CardHeader>
      <Heading size='md'>{post.title}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{post.text}</Text>
    </CardBody>
  </Card>
    ))}
</SimpleGrid>
    </div>
        </div>

        
      ) : (
        <div>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to post comments.</div>
      )}
		
	</div>
	);
}

export default Journalise;
