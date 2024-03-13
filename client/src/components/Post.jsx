import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Textarea, useToast } from '@chakra-ui/react';
import { CREATE_POST } from '../utils/mutations';
import { AuthContext } from '../context/AuthContext';
import { GET_POSTS_QUERY } from '../utils/queries'; 

function CreatePost() {
    const { user } = useContext(AuthContext);
    const [body, setBody] = useState('');
    const toast = useToast();

    const [createPost, { loading }] = useMutation(CREATE_POST, {
        variables: { body },
        update(cache, { data: { createPost } }) {
        
            const data = cache.readQuery({ query: GET_POSTS_QUERY });
            cache.writeQuery({
                query: GET_POSTS_QUERY,
                data: { getPosts: [createPost, ...data.getPosts] },
            });
            setBody('');
            toast({
                title: 'Post created.',
                description: 'Your post has been successfully created.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError(err) {
            toast({
                title: 'Error creating post.',
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
    };

    return (
        <Box my={4}>
            {user && (
                <form onSubmit={handleSubmit}>
                    <Textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="What's on your mind?"
                        isRequired
                    />
                    <Button
                        mt={4}
                        type="submit"
                        colorScheme="teal"
                        isLoading={loading}
                    >
                        Create Post
                    </Button>
                </form>
            )}
        </Box>
    );
}

export default CreatePost;

