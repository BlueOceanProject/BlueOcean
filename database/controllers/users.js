const Users = require('../models/users');


module.exports = {
  getUserByUserId: (username, cb) => {
    Users.find({ _id: username.userId }).exec((err, docs) => {
      if (err) {
        cb(err);
      } else {
        cb(null, docs);
      }
    })
  },

  makePublished: (song, cb) => {
    Users.findOneAndUpdate({
      userName: song.userName,
      songName: song.songName,
      createdAt: song.createdAt,
    }, {published: true}, null, (err, docs) => {
      if (err) {
        cb(err);
      } else {
        cb(null, docs);
      }
    })
  }
};