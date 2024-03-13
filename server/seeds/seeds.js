const db = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

db.once('open', async () => {
  
  await User.deleteMany({});
  await Post.deleteMany({});

  await User.insertMany(userData);
  console.log('Users seeded!');

  await Post.insertMany(postData);
  console.log('Posts seeded!');

  process.exit(0);
});
