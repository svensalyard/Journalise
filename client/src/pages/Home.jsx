import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Text, VStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/queries';

function Journalise() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Box>
      <Navbar />
      <Text fontSize="2xl" pt="60px" my={4}>Recent Posts</Text>
      {user && <PostForm />}
      {loading ? (
        <Text>Loading posts...</Text>
      ) : (
        <VStack spacing={8}>
          {posts && posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default Journalise;
