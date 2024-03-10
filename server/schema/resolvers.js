const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Categories } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'yourSecretKeyHere';

const resolvers = {
  Query: {
    // Fetch all posts
    posts: async () => {
      try {
        return await Post.find().sort({ postTime: -1 }).populate('categories');
      } catch (err) {
        throw new Error(err);
      }
    },
    // Fetch posts by category
    postsByCategory: async (_, { categoryId }) => {
      try {
        return await Post.find({ categories: categoryId }).populate('categories');
      } catch (err) {
        throw new Error(err);
      }
    },
    // Fetch single post by ID
    post: async (_, { id }) => {
      try {
        const post = await Post.findById(id).populate('categories');
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // User signup
    signUp: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const res = await newUser.save();
      const token = jwt.sign(
        { id: res.id, email: res.email, username: res.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    // User login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // Create a post
    createPost: async (_, { postText, username, categories }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      const newPost = new Post({
        postText,
        postTime: new Date().toISOString(),
        username,
        categories,
      });
      await newPost.save();
      return newPost;
    },
    // Delete a post
    deletePost: async (_, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      if (context.user.username === post.username) {
        await post.delete();
        return true;
      } else {
        throw new AuthenticationError('Action not allowed');
      }
    },
    
    

  },
};

module.exports = resolvers;
