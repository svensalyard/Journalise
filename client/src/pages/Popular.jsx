import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Box, Flex } from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi"; // Corrected import

function Journalise() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [post, setPost] = useState([]);

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
					<h1><Link to="/">Journalise</Link></h1>
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
				<div className="PostsContainer">
					<div className="header">
						<Heading as='h2' size='2xl'>
						All Time Most Popular Posts:
						</Heading>
					</div>
					<div>
					{post.map((post, index) => (
						<div className="eachPost" key={index}>
						<Card maxW="" backgroundColor='#BEBDB8'>---
							<CardHeader>
								<Flex spacing="4">
									<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
										<Box>
											<Heading size="sm">{post.username}</Heading>
											<Text>{post.date}</Text>
										</Box>
									</Flex>
								</Flex>
							</CardHeader>
							<CardBody>
							<Heading as='h2' size='xl'>{post.title}</Heading>
								<Text>{post.text}</Text>
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
					</div>
					))}
					</div>
				</div>
			</main>
			</div>
    );
}

export default Journalise;
