const Users = require('../models/users');


module.exports = {
  getUserByUsername: (username, cb) => {
    Users.find({ userName: username }).exec((err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    })
  }
};