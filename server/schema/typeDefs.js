const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    categories: [Category]
    postsByCategory(categoryId: ID!): [Post]
    post(id: ID!): Post
    userProfile(userId: ID!): User
    userFeed(userId: ID!): [Post]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createPost(title: String!, content: String!, categoryId: ID!): Post
    editPost(postId: ID!, title: String, content: String): Post
    deletePost(postId: ID!): Boolean
    addComment(postId: ID!, content: String!): Comment
  }

  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    category: Category!
    comments: [Comment]
    author: User!
  }

  type Category {
    id: ID!
    name: String!
    posts: [Post]
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
module.exports = typeDefs;
