const Feeds = require('../models/feeds');

const getLatestFeedsByUser = (userName, pageNum, callback) => {
  const perPage = 5;
  const regex = new RegExp(userNames);
  var query = Feeds.find({ "userName": { "$regex": regex } })
    .skip(pageNum * perPage).limit(perPage).sort({ published: -1 });

  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  })
};

module.exports = { getLatestFeedsByUser };