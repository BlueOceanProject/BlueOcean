const Users = require('../models/users');

const postSignUpUser = (userInfo) => {
  const user = new Users(userInfo);
  return user.save();
};

module.exports = {
  postSignUpUser,
};