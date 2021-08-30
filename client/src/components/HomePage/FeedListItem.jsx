import React from 'react';
// import './Feed.css';

const FeedListItem = ({ feed }) => {
  // TODO: refactor feed userName, songName, audio s3 url
  return (
    <div className="feed-list-item-wrapper">
      <img className="user-image" src="img_avatar.jpeg" alt="Avatar"></img>
      <span className="feed-username">
        {/* {feed.userName} */}
        {feed.author_name}
      </span>
      <span className="feed-songname">
        {/* {feed.songName} */}
        {feed.title}
      </span>
      <audio
        controls
        src="http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"
      // src={feed.url}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default FeedListItem;