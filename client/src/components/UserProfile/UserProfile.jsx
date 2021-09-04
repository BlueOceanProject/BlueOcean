import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './profile.css';
import { Link } from 'react-router-dom';
import SongListItem from './SongListItem.jsx';
import { GlobalContext } from '../App.jsx';

const UserProfile = (props) => {
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
        setCurrentUser(res.data._id);
        setUserInfo(res.data[0]);
        setUserSongs(res.data[0].songs);
        showSignInMessage(false);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  };

  useEffect(() => {
    if (!props.location.state && userId === '') {
      showSignInMessage(true);
    } else if (props.location.state) {
      getUser(props.location.state.userId);
      setMyProfile(false);
      if (props.location.state.userId === userId) {
        setMyProfile(true);
      }
    } else {
      getUser(userId);
      setMyProfile(true);
    }
    if (userId === '') {
      setSignedOut(true);
    }
  }, [currentUser]);

  if (signInMessage) {
    return (
      <>
        <div className="w-100 text-center mt-5">
          {' '}
          Need an account?
          <Link to="/signup">Sign up</Link>
        </div>
        <div className="w-100 text-center mt-5">or</div>
        <div className="w-100 text-center mt-5">
          {' '}
          Have an account?
          <Link to="/signin">Sign in</Link>
        </div>
      </>
    );
  }
  return (
    <div className="profile-songs">
      <div>
        <div className="profile">
          <span className="username">{userInfo.userName}</span>
          <img className="profileImg" src={userInfo.profileImg ? userInfo.profileImg : 'default.png'} />
          <div className="profileTxt">
            {/* <span className="username">{userInfo.userName}</span> */}
            <span>Welcome to the profile page. Bio editing coming soon.</span>
          </div>
        </div>
      </div>
      <div className="songContainer">
        {userSongs.map((song) => (
          <SongListItem
            key={song.songName}
            myProfile={myProfile}
            song={song}
            userImg={userInfo.profileImg}
            signedOut={signedOut}
            userId={userInfo._id}
            userName={userInfo.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
