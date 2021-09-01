const Users = require('../models/users');

Users.findOneAndUpdate({
  userName: song.userName,
  createdAt: song.createdAt,
}, {published: true})

