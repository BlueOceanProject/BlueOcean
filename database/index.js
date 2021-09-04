const mongoose = require('mongoose');
const { USER, PASSWORD, IP_ADDRESS } = require('./config');

mongoose.connect(`mongodb://${USER}:${PASSWORD}@${IP_ADDRESS}/blue_ocean`, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;
