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
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 43cfa6cb14bdbc720f633ba84315a7f654502274
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
