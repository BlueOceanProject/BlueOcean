const util = require('util');
const TextEncoder = new util.TextEncoder();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4() },
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  profileImg: String,
  songs: [{
    _id: { type: String, default: uuidv4() },
    userName: String,
    songName: String,
    url: String,
    published: Boolean,
    publishedDate: Date,
    createdAt: Date,
  }]
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;