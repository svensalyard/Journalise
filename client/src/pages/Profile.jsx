import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, CardHeader, CardBody, SimpleGrid, Heading, Text, Box,  Flex, Avatar, Image, Stack, CardFooter, Button } from "@chakra-ui/react";

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

<div>
    <div>

<Heading as='h2' size='2xl' className="margin">
						Your Profile:
						</Heading>
            {user.map((user) => (
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  backgroundColor='#BEBDB8'
  key={user}
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://www.svgrepo.com/show/70679/male-user-shadow.svg'
    alt='User Profile Image'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{user.username}</Heading>

      <Text py='2'>
      Joined: {user.date}
      </Text>
    </CardBody>

    <CardFooter>
      <Link to="/postform">
      <Button variant='solid' colorScheme='blue'>
        Create New Post
      </Button>
      </Link>
    </CardFooter>
  </Stack>
</Card>
    ))}
</div>

<div>

<Heading as='h2' size='xl' className="margin">
    Your Posts:
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    {post.map((post, index) => (
  <Card backgroundColor='#BEBDB8' key={index}>
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


        </div>
      ) : (
        <div>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to post comments.</div>
      )}
		
	</div>
	);
}

export default Journalise;
