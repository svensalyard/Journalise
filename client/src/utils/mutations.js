import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!,
  $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
mutation createPost($body: String!, $title: String!) {
  createPost(body: $body, title: $title) {
    id
    body
    title
    createdAt
    username
  }
}
`;

export const EDIT_POST = gql`
  mutation editPost($postId: ID!, $body: String!, $title: String!) {
    editPost(postId: $postId, body: $body, title: $title) {
      id
      body
      title
      createdAt
      username
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

