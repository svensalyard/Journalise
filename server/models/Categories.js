const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema(
  {
    categoreyName: {
      type: String,
      required: true
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 43cfa6cb14bdbc720f633ba84315a7f654502274
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