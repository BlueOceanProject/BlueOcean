const Users = require('../models/users');

Users.findOneAndUpdate({
  userName: song.userName,
  createdAt: song.createdAt,
}, {published: true})


db.users.findOneAndUpdate({songs._id: "0a1567d1-2bbd-4dc2-9ffe-1f4361cc99c6"}, {$set: {songs.$.published: true}})
