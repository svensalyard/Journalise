const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema(
  {
    categoreyName: {
      type: String,
      required: true
    },
    Post: [postSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;