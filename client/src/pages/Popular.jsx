import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Box, BiLike, Flex, BiChat, BiShare } from "@chakra-ui/react";

function Journalise() {
	const { isLoggedIn, logout, } = useContext(AuthContext);
	const [post, setPost] = useState([]);
	setPost((prevPost) => [...prevPost]);

	return (
		<div className="container">
			<nav className="navbar">
				<div className="navbar-left">
					<ul>
						<li>
							<Link to="/popular">Popular</Link>
						</li>
						<li>
							<Link to="/categories">Categories</Link>
						</li>
						<li>
							<Link to="/profile">Your Profile</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-center">
					<h1>Journalise</h1>
				</div>
				<div className="navbar-right">
					{!isLoggedIn ? (
						<>
							<Link to="/login">
								<button>Login</button>
							</Link>
							<Link to="/signup">
								<button>Sign Up</button>
							</Link>
						</>
					) : (
						<button onClick={logout}>Logout</button>
					)}
				</div>
			</nav>

			<main>
				<div className="Container">
					<div>
					{post.map((post, index) => (
						<Card maxW="md" key={index}>
							<CardHeader>
								<Flex spacing="4">
									<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
										{/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
										<Box>
											<Heading size="sm">{post.title}</Heading>
											<Text>{post.username}</Text>
											<Text>{post.date}</Text>
										</Box>
									</Flex>
								</Flex>
							</CardHeader>
							<CardBody>
								<Text>{post.text}</Text>
								<Text pt="2" fontSize="sm">
									{post.date}
								</Text>
							</CardBody>

							<CardFooter
								justify="space-between"
								flexWrap="wrap"
								sx={{
									"& > button": {
										minW: "136px",
									},
								}}>
								<Button flex="1" variant="ghost" leftIcon={<BiLike />}>
									Likes {post.likes}
								</Button>
								<Button flex="1" variant="ghost" leftIcon={<BiChat />}>
									Comment
								</Button>
								<Button flex="1" variant="ghost" leftIcon={<BiShare />}>
									Share
								</Button>
							</CardFooter>
						</Card>
					))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default Journalise;
