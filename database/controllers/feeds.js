const Feeds = require('../models/feeds');

const getLatestFeedsByUser = (params, callback) => {
  const perPage = 3;
  const { pageNum, userName } = params;
  const offset = (pageNum - 1) * perPage;
  const re = userName ? new RegExp(userName, 'i') : /.*.*/;
  Feeds.find({
    "userName": re
  })
    .skip(offset).limit(perPage).sort({ publishedDate: -1 }).exec((err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    })

};

module.exports = { getLatestFeedsByUser };