import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile.css';
import Button from 'react-bootstrap/Button';

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


const SongListItem = ({ myProfile, song, userImg, signedOut, userId, userName}) => {
  const [published, setPublished] = useState(false);

  const handleAddToFeed = () => {

    song.profileImg = userImg;
    song.userId = userId;
    song.userName = userName;
    setPublished(true);
    song.published = true;
    axios.post('/feeds', song)
    .then(() => {
      axios.put('/users', song).then(() => {}).catch((err) => {console.error(err.stack)})
    })
    .catch((err) => {
      console.error(err.stack)
    })
  }
  return (
        <div>
        <div className="eachSong">
          <span>{song.songName}</span>
          <audio
              controls
              controlsList={signedOut ? "nodownload" : ""}
              src={song.url}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            {myProfile && !song.published ? <Button variant="outline-dark" onClick={handleAddToFeed}>Publish</Button> : null}
            <Link to={{ pathname: '/create', state: { url: `${song.url}` } }}>
          <Button variant="outline-dark">Import</Button>
        </Link>

        </div>
        <FacebookShareButton
        url="https://www.google.com"
        quote={song.url}
        hashtag="#Harmony">
          <FacebookIcon size={36} round/>
        </FacebookShareButton>
        <TwitterShareButton
        url="https://www.google.com"
        quote={song.url}
        hashtag="#Harmony">
        <TwitterIcon size={36} round/>
        </TwitterShareButton>
        <RedditShareButton
        title={song.songName}
        url="https://www.google.com"
        quote={song.url}
        >
          <RedditIcon size={36} round/>
        </RedditShareButton>
        <TumblrShareButton
        title={song.songName}
        url="https://www.google.com"
        caption={song.url}
        tags={["#Harmony"]}
        >
          <TumblrIcon size={36} round/>
        </TumblrShareButton>
        </div>
  );
};
export default SongListItem;