import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import SongListItem from './SongListItem.jsx'

const UserProfile  = (props) => {
  //console.log(props.location.state.userName);
  const [myProfile, setMyProfile] = useState(true);
  const [currentUser, setCurrentUser] = useState(props.location.state.userId);
  const [userInfo, setUserInfo] = useState('');
  const [userSongs, setUserSongs] = useState([]);

  const getUser = (username) => {
    axios.get(`/user?_id=${username}`)
    .then((res) => {
      console.log(res.data[0].songs, 'did we get back to profile');
      setCurrentUser(username);
      setUserInfo(res.data[0]);
      setUserSongs(res.data[0].songs);
    })
    .catch((err) => {
      console.error(err.stack)
    })
  }

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser])

    return (
      <div className="profile-songs">
        <div>
      <div className="profile">
        <h2>{myProfile ? 'My Profile' : `${currentUser}'s Profile`}</h2>
        <img className="profileImg" src={userInfo.profileImg} />
        </div>
        <div className="profileTxt">
          <span className="username">{userInfo.userName}</span>
          <span>description goes here skdjfnskdjfblkajdhflks adjh flksdjhflksdjh flksjn dfhlksdjhfksdjfhksdjhf lskedjfhlskdjfh as dksjdfhlas alskdjfh lasksdjfh laksdjfh lkasjdhf lskadjfh lskadj hlsakdjfh alskdjfh lsakdjfh aslkdjfh salkdjfh alskdjfh kasldjhflaksdj hsalkdjh laskdjfh laksdjfh lksajdhf lksadjfh laskdjfh laskdjfh laksjdfh lkasjdfh alskdjfh lsakjdfh lsakdjfh laskdjfh lasdkjfh lskajdfh lsakdjfh lsakdjfh laskdjfh laskdjf hlaskdjfh laskdjfh </span>
        </div>
        </div>
        <div className="songItem">
        {userSongs.map((song) => {
          return <SongListItem key={song.songName} myProfile={myProfile} song={song} userImg={userInfo.profileImg}/>
        })}
        </div>
      </div>
  )
}

export default UserProfile;