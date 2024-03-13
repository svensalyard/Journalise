const { User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({
    id: user._id, 
    username: user.username,
    email: user.email
  }, SECRET_KEY, { expiresIn: '1h' });
};

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await User.findById(context.user._id); // Use _id to query
    },
    users: async () => {
      return await User.find({});
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      // Example validation logic here (e.g., checking password strength)
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new UserInputError('Username or email is already taken', { 
          errors: {
            username: 'This username/email is already taken', 
          },
        });
      }
    
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });
    
      const res = await newUser.save();
      const token = generateToken(res);
    
      return {
        token,
        user: res,
      };
    },
    
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new AuthenticationError('User not found');

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError('Wrong credentials');

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
    savePost: async (parent, { postData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedPosts: postData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not authenticated");
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPosts: { postId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not authenticated");
    },
  },
};

module.exports = resolvers;
