import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Button, Text, VStack, Image, HStack, useToast } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { GET_POSTS_QUERY } from '../utils/queries';
import { CREATE_COMMENT } from '../utils/mutations';

function Post(props) {
    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;

    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const toast = useToast();

    const { loading, data } = useQuery(GET_POSTS_QUERY, {
        variables: { postId }
    });

    const [submitComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('');
            commentInputRef.current.blur();
            toast({
                title: "Comment added.",
                description: "Your comment has been posted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        },
        variables: {
            postId,
            body: comment
        }
    });

    const deleteButtonCallback = () => {
        props.history.push('/');
    };

    if (loading) {
        return <Text>Loading post...</Text>;
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost;

        return (
            <VStack spacing={4} align="stretch">
                <Box p={5} shadow="md" borderWidth="1px">
                    <HStack>
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src="https://bit.ly/dan-abramov"
                            alt={username}
                        />
                        <VStack align="start">
                            <Text fontWeight="bold">{username}</Text>
                            <Text fontSize="sm">{moment(createdAt).fromNow()}</Text>
                        </VStack>
                    </HStack>
                    <Text mt={4}>{body}</Text>
                </Box>
                <Box>
                    <LikeButton user={user} post={{ id, likeCount, likes }} />
                    {user && user.username === username && (
                        <DeleteButton postId={id} callback={deleteButtonCallback} />
                    )}
                </Box>
                {user && (
                    <Box>
                        <Text mt={4}>Post a comment</Text>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submitComment();
                        }}>
                            <HStack mt={4}>
                                <input
                                    placeholder="Comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button
                                    colorScheme="teal"
                                    type="submit"
                                    disabled={comment.trim() === ''}
                                >
                                    Submit
                                </Button>
                            </HStack>
                        </form>
                    </Box>
                )}
                {comments.map((comment) => (
                    <Box key={comment.id} p={5} shadow="md" borderWidth="1px">
                        <Text fontWeight="bold">{comment.username}</Text>
                        <Text fontSize="sm">{moment(comment.createdAt).fromNow()}</Text>
                        <Text mt={4}>{comment.body}</Text>
                        {user && user.username === comment.username && (
                            <DeleteButton postId={id} commentId={comment.id} />
                        )}
                    </Box>
                ))}
            </VStack>
        );
    }
}

export default Post;
