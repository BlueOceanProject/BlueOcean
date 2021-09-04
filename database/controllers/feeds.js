const Feeds = require('../models/feeds');

const getLatestFeedsByUser = (params, callback) => {
  const perPage = 3;
  const { pageNum, userName } = params;
  const offset = (pageNum - 1) * perPage;
  const re = userName ? new RegExp(userName, 'i') : /.*.*/;
  Feeds.find({
    userName: re,
  })
    .skip(offset).limit(perPage).sort({ publishedDate: -1 })
    .exec((err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    });
};

const addToFeed = (params, cb) => {
  const date = new Date();
  const publish = new Feeds({
    userId: params.userId,
    userName: params.userName,
    songName: params.songName,
    url: params.url,
    publishedDate: date,
    createdAt: params.createdAt,
    profileImg: params.profileImg,
  });
  publish.save((err, published) => {
    if (err) {
      cb(err);
    } else {
      cb(null, `${published.songName} by ${published.userName} published to feed`);
    }
  });
};

module.exports = { getLatestFeedsByUser, addToFeed };
