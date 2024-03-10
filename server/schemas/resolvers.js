const { User } = require("../models");
const { signToken, AuthenticationError } = require("./utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({_id: context.user._id}).select('-__v -password');

				return userData;
			}
			throw AuthenticationError;
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return {token, user};
		},
		login: async (parent, {email, password}) => {
			const user = await User.findOne({email});
			if (!user) {throw AuthenticationError;}
			const correctPassword = await user.passwordQuery(password);
			if (!correctPassword) {throw AuthenticationError;}
			const token = allowToken(user);
			return {token, user};
		},
		savePost: async (parent, { postData }, context) => {
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					{_id: context.user._id},
					{ $pull: { savedPosts: postData}},
					{new: true }
				);
				return updatedPost;
			}
			throw AuthenticationError;
		},
		removePost: async (parent, {postId}, context) => {
			if(context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedPosts: { postId}}},
					{ new: true }
				);
				return updatedUser;
			}
			throw AuthenticationError;
		},
	}
};

module.exports = resolvers;