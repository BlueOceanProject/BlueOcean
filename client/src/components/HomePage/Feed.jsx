import React, { useState } from 'react';
import FeedListItem from './FeedListItem.jsx';
import Feeds from './sampleData.js';


const Feed = () => {
  return (
    <>
      {Feeds.map((feed) =>
        <FeedListItem key={feed.id} feed={feed} />
      )}
    </>
  );
}

export default Feed;