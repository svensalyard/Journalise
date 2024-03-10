const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  toJSON: { getters: true },
  id: false,
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
