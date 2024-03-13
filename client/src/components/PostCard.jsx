import React, { useContext } from 'react';
import { Box, Button, Image, Text, Flex, Spacer, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaComments, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext'; 
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton'; 

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      <Flex align="center">
        <Image
          borderRadius="full"
          boxSize="50px"
          alt={username}
          mr={4}
        />
        <Box>
          <Text fontWeight="bold">{username}</Text>
          <ChakraLink as={Link} to={`/posts/${id}`} color="teal.500">
            {moment(createdAt).fromNow()}
          </ChakraLink>
        </Box>
        <Spacer />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Flex>

      <Text mt={2}>{body}</Text>

      <Flex align="center" mt={4}>
        <LikeButton user={user} post={{ id, likes, likeCount }} icon={<FaHeart />} />
        <Button as={Link} to={`/posts/${id}`} leftIcon={<FaComments />} colorScheme="blue" variant="outline" ml={2}>
          {commentCount}
        </Button>
      </Flex>
    </Box>
  );
}

export default PostCard;
