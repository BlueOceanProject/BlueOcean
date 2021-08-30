import React from 'react';
import './Feed.css';

const FeedListItem = ({ feed }) => {

  return (
    <div className="feed-list-item-wrapper">
      <img className="user-image" src="img_avatar.jpeg" alt="Avatar"></img>
      <span className="feed-username">
        {feed.userName}
      </span>
      <span className="feed-songname">
        {feed.songName}
      </span>
      <audio
        controls
        // controlsList="nodownload"
        src={feed.url}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default FeedListItem;