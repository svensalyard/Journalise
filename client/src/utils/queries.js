import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedPosts {
        postId
        title
        text
      }
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;