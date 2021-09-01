import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './profile.css';
import SongListItem from './SongListItem.jsx';
import { GlobalContext } from '../App.jsx';
import { Link } from 'react-router-dom';

const UserProfile  = (props) => {
  const [myProfile, setMyProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [userSongs, setUserSongs] = useState([]);
  const [signInMessage, showSignInMessage] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const globalData = useContext(GlobalContext);
  const { userId } = globalData.state;

  const getUser = (id) => {
    axios.get(`/user?_id=${id}`)
    .then((res) => {
      //console.log(res.data[0].songs, 'did we get back to profile');
      setCurrentUser(res.data._id);
      setUserInfo(res.data[0]);
      setUserSongs(res.data[0].songs);
      showSignInMessage(false);
    })
    .catch((err) => {
      console.error(err.stack)
    })
  }

  useEffect(() => {
    if (!props.location.state && userId === '') {
      showSignInMessage(true);
    } else if (props.location.state) {
      getUser(props.location.state.userId);
      setMyProfile(false);
    } else {
      getUser(userId);
      setMyProfile(true);
    }
    if (userId === '') {
      setSignedOut(true);
    }
  }, [currentUser])

  if (signInMessage) {
    return (
      <>
      <div className="w-100 text-center mt-5"> Need an account? <Link to="/signup">Sign up</Link></div>
      <div className="w-100 text-center mt-5">or</div>
      <div className="w-100 text-center mt-5"> Have an account? <Link to="/signin">Sign in</Link></div>
      </>
    )
  } else {
    return (
      <div className="profile-songs">
        <div>
      <div className="profile">
        <h2>{myProfile ? 'My Profile' : `${userInfo.userName}'s Profile`}</h2>
        <img className="profileImg" src={userInfo.profileImg} />
        </div>
        <div className="profileTxt">
          <span className="username">{userInfo.userName}</span>
          <span>description goes here Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

C/O https://placeholder.com/text/lorem-ipsum/#Copy_and_Paste_Lorem_Ipsum </span>
        </div>
        </div>
        <div className="songItem">
        {userSongs.map((song) => {
          return <SongListItem
          key={song.songName}
          myProfile={myProfile}
          song={song}
          userImg={userInfo.profileImg}
          signedOut={signedOut}
          />
        })}
        </div>
      </div>
    )
  }
}

export default UserProfile;