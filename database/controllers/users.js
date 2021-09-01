const Users = require('../models/users');

module.exports = {
  getUserByUserId: (username, cb) => {
    //console.log('at controller', username._id)
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

  insertSongForUser: (id, url, songName) => {
    // console.log('insertSongForUser');
    const now = new Date()
    const song = {
      userId: id,
      songName: songName,
      url: url,
      published: false,
      createdAt: now
    }

    Users.update(
      { userId: id }, { $push: { songs: song } }, (error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      });
  }
};
