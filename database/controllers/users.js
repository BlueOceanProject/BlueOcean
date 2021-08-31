const Users = require('../models/users');


module.exports = {
  getUserByUserName: (username, cb) => {
    Users.find({ userName: username.userName }).exec((err, docs) => {
      if (err) {
        cb(err);
      } else {
        cb(null, docs);
      }
    })
  }
};