const Users = require('../models/users');

const postSignUpUser = (userInfo) => {
  const user = new Users(userInfo);
  return user.save();
};

const insertSongForUser = (id, url, songName) => {
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

module.exports = { insertSongForUser, postSignUpUser };
