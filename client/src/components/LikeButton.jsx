import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { LIKE_POST } from '../utils/mutations';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    
  });

  return (
    <Button 
      as={user ? Button : Link} 
      to={!user && "/login"} 
      leftIcon={<FaHeart />} 
      colorScheme={liked ? "red" : "gray"} 
      onClick={likePost}
    >
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </Button>
  );
}

export default LikeButton;
