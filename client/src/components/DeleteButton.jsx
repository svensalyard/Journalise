import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { GET_POSTS_QUERY } from '../utils/queries';
import { DELETE_POST, DELETE_COMMENT } from '../utils/mutations';

function DeleteButton({ postId, commentId, callback }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletePostOrComment] = useMutation(commentId ? DELETE_COMMENT : DELETE_POST, {
    variables: { postId, commentId },
    onCompleted: () => {
      onClose();
      if (callback) callback();
    },
    refetchQueries: [{ query: GET_POSTS_QUERY }],
  });

  return (
    <>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={onOpen} size="sm">
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? 
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => deletePostOrComment()} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteButton;
