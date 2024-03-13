import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Input, Textarea, useToast, Text } from '@chakra-ui/react';
import { CREATE_POST } from '../utils/mutations';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function CreatePost() {
  const { user } = useContext(AuthContext);
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const toast = useToast();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    variables: { body: postBody, title: postTitle },
    // Other configurations remain the same
    onCompleted: () => {
      setPostBody('');
      setPostTitle('');
    },
    onError: (err) => {
      toast({
        title: 'Error creating post',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
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
            mb={2}
            isRequired
          />
          <Textarea
            placeholder="What's on your mind?"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            isRequired
          />
          <Button mt={4} isLoading={loading} type="submit" colorScheme="teal">
            Submit
          </Button>
        </form>
        {error && <Text color="red.500">Error: {error.message}</Text>}
      </Box>
    </>
  );
}

export default CreatePost;

