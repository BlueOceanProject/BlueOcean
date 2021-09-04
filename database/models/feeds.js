const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const feedSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4() },
  userId: String,
  userName: String,
  songName: String,
  url: String,
  publishedDate: Date,
  createdAt: Date,
  profileImg: String,
});

const Feeds = mongoose.model('Feeds', feedSchema);
module.exports = Feeds;
