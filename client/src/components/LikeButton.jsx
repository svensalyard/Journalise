import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const toggleLike = (postId) => {
  console.log('Toggling like for post:', postId);
  
};

const LikeButton = ({ user, post, icon }) => {
  const toast = useToast();
  const isLiked = post.likes.some(like => like.username === user?.username);

  const handleLike = () => {
    if (!user) {
      toast({
        title: 'Please log in to like posts.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    toggleLike(post.id);
   
  };

  return (
    <Button onClick={handleLike} leftIcon={icon} colorScheme={isLiked ? 'red' : 'gray'}>
      {isLiked ? 'Unlike' : 'Like'} {post.likeCount}
    </Button>
  );
};

export default LikeButton;
