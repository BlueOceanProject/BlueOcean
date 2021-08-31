import React, { useState } from 'react';
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


const SongListItem = ({ myProfile }) => (
  <div>
  <div className="songItem">
    <span>Song title goes here</span>
    <audio
        controls
        src="http://cd.textfiles.com/10000gp2/500SNDS/8_38.WAV"
      // src={feed.url}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      {myProfile ? <Button variant="outline-dark">Publish</Button> : null}
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

export default SongListItem;