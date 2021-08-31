const Users = require('../models/users');

const postSignUpUser = (userInfo) => {
  const user = new Users(userInfo);
  return user.save();
};

const insertSongForUser = (userName, url, songName) => {
  // console.log('insertSongForUser');
  const now = new Date()
  const song = {
    userName: userName,
    songName: songName,
    url: url,
    published: false,
    createdAt: now
  }

  Users.update(
    { userName: userName }, { $push: { songs: song } }, (error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    });
}

module.exports = { insertSongForUser, postSignUpUser };
