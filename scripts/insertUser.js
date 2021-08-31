const Users = require('../database/models/users.js');
const db = require('../database/index.js');

Users.create({userName: 'ttt', firstName: 'rrr', lastName: 'hhh', email:"rrr@hhh", phoneNumber:'12343', profileImg:'sjweotw', songs: []}, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});