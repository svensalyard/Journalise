const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: 'Post must have content.',
      minlength: 10,
    },
    postTime: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    Categories: [categoriesSchema]
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
