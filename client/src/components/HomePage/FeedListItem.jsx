import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../App.jsx';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  RedditIcon,
  RedditShareButton,
  TumblrShareButton,
  TumblrIcon
} from "react-share";

import './Feed.css';

const url = 'https://www.google.com';

const FeedListItem = ({ feed }) => {
  const globalData = useContext(GlobalContext);
  const { userId } = globalData.state;
  // const userId = "test";
  return (
    <div className="feed-list">
      <div className="feed-list-item-wrapper">
        <img className="user-image" src={feed.profileImg} alt="Avatar"></img>
        <span className="feed-username">
          <Link to={{ pathname: '/users', state: { userId: `${feed.userId}` } }}>
            {feed.userName}
          </Link>
        </span>
        <span className="feed-songname">
          {feed.songName}
        </span>
        <audio
          controls
          controlsList={userId ? "" : "nodownload"}
          src={feed.url}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
      <div className="social-media-share">
        <FacebookShareButton
          url={url}
          quote={feed.url}
          hashtag="#Harmony">
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          quote={feed.url}
          title={feed.songName}
          hashtag="#Harmony">
          <TwitterIcon size={36} round />
        </TwitterShareButton>
        <RedditShareButton
          title={feed.songName}
          url={url}
          quote={feed.url}
        >
          <RedditIcon size={36} round />
        </RedditShareButton>
        <TumblrShareButton
          title={feed.songName}
          url={url}
          caption={feed.url}
          tags={["#Harmony"]}
        >
          <TumblrIcon size={36} round />
        </TumblrShareButton>
      </div>

    </div >
  );
};

export default FeedListItem;