import React, { useState } from 'react';
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


const SongListItem = ({ myProfile, song, userImg}) => {
  const handleAddToFeed = () => {
    song.profileImg = userImg
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
        src={song.url}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      {myProfile && !song.published ? <Button variant="outline-dark" onClick={handleAddToFeed}>Publish</Button> : null}
  </div>
  <FacebookShareButton
  url="https://www.google.com"
  quote={"http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"}
  hashtag="#Harmony">
    <FacebookIcon size={36} round/>
  </FacebookShareButton>
  <TwitterShareButton
  url="https://www.google.com"
  quote={"http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"}
  hashtag="#Harmony">
  <TwitterIcon size={36} round/>
  </TwitterShareButton>
  <RedditShareButton
  title="song url?"
  url="https://www.google.com"
  quote={"http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"}
  >
    <RedditIcon size={36} round/>
  </RedditShareButton>
  <TumblrShareButton
  title="Checkout this song I made on Harmony!"
  url="https://www.google.com"
  caption={"http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"}
  tags={["#Harmony"]}
  >
    <TumblrIcon size={36} round/>
  </TumblrShareButton>
  </div>
  )
}
export default SongListItem;