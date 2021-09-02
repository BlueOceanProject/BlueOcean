const Users = require('../models/users');

module.exports = {
  getUserByUserId: (username, cb) => {
    Users.find({ _id: username._id }).exec((err, docs) => {
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
      "songs._id": song._id
  }, {$set: {"songs.$.published": true}}, null, (err, docs) => {
      if (err) {
        cb(err);
      } else {
        cb(null, docs);
      }
    })
  },

  postSignUpUser: (userInfo) => {
    const user = new Users(userInfo);
    return user.save();
  },

  getUsernameById: (userId) => {
    return Users.findOne({ '_id': userId});
  },

  insertSongForUser: (id, url, songName) => {
    console.log(id);
    const now = new Date()
    const song = {
      songName: songName,
      url: url,
      published: false,
      createdAt: now
    }

    Users.update(
      { _id: id }, { $push: { songs: song } }, (error, success) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(success);
        }
      });
  },

  updateProfileImage: (url, userid) => {
    return Users.findOneAndUpdate({"_id": userid}, {$set: {"profileImg": url}});
  }
};
