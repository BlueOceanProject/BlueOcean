const Feeds = require('../models/feeds');

const getLatestFeedsByUser = (params, callback) => {
  const perPage = 5;
  const { pageNum, userName } = params;
  console.log({ pageNum, userName });
  const offset = (pageNum - 1) * perPage;
  // console.log(offset);
  const re = userName ? new RegExp(userName, 'i') : /.*.*/;
  // console.log(re);
  Feeds.find({
    "userName": re
  })
    .skip(offset).limit(perPage).sort({ published: -1 }).exec((err, docs) => {
      if (err) {
        callback(err);
      } else {
        // console.log('docs', docs);
        callback(null, docs);
      }
    })

};

module.exports = { getLatestFeedsByUser };