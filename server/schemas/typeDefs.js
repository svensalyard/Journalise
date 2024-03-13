const typeDefs = `
  type User {
		_id: ID!
		username: String!
		email: String
		postCount: Int
		savedPosts: [Post]
  }

	type Post {
		postId: ID!
		poster: [String]
		postTitle: String
		postText: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	input PostInput {
		poser: [String]
		text: String!
		title: String!
	}

	type Query {
		me: User
    users: [User]
	}
	
	type Mutation {
		createPost(body: String!, title: String!): Post
	  }
	type Post {
		id: ID!
		body: String!
		title: String!
		createdAt: String!
		username: String! 
	  }

	type Mutation {
		login(username: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		savePost(postData: PostInput!): User
		removePost(postId: ID!): User
	}
`;

module.exports = typeDefs;