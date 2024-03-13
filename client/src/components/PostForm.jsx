import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Textarea, useToast, Text, Input } from '@chakra-ui/react';
import { CREATE_POST } from '../utils/mutations';
import { AuthContext } from '../context/AuthContext';
import { GET_POSTS_QUERY } from '../utils/queries';
import Navbar from '../components/Navbar'; 

function CreatePost() {
  const { user } = useContext(AuthContext);
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState(''); 
  const toast = useToast();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    variables: { body: postBody, title: postTitle }, 
    update(cache, { data: { createPost } }) {
      const { getPosts } = cache.readQuery({ query: GET_POSTS_QUERY });
      cache.writeQuery({
        query: GET_POSTS_QUERY,
        data: { getPosts: [createPost, ...getPosts] },
      });
    },
    onCompleted: () => {
      setPostBody('');
      setPostTitle(''); 
    },
    onError: (err) => toast({
      title: 'Error creating post',
      description: err.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postBody.trim() || !postTitle.trim()) return; 
    createPost();
  };

  return (
    <>
      <Navbar />
      <Box my={4} pt="60px">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            isRequired
            mb={4}
          />
          <Textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            placeholder="What's on your mind?"
            isRequired
          />
          <Button
            mt={4}
            isLoading={loading}
            type="submit"
            colorScheme="teal"
          >
            Submit
          </Button>
        </form>
        {error && (
          <Text color="red.500">Error: {error.message}</Text>
        )}
      </Box>
    </>
  );
}

export default CreatePost;
