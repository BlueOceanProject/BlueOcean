import React, { useState, useEffect } from 'react';
import './profile.css';
import SongListItem from './SongListItem.jsx'

const UserProfile  = () => {
  const [myProfile, setMyProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // axios()
  })

    return (
      <div className="profile-songs">
        <div>
      <div className="profile">
        <h2>Profile Page</h2>
        <img className="profileImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg" />
        </div>
        <div className="profileTxt">
          <span className="username">username goes here</span>
          <span>description goes here skdjfnskdjfblkajdhflks adjh flksdjhflksdjh flksjn dfhlksdjhfksdjfhksdjhf lskedjfhlskdjfh as dksjdfhlas alskdjfh lasksdjfh laksdjfh lkasjdhf lskadjfh lskadj hlsakdjfh alskdjfh lsakdjfh aslkdjfh salkdjfh alskdjfh kasldjhflaksdj hsalkdjh laskdjfh laksdjfh lksajdhf lksadjfh laskdjfh laskdjfh laksjdfh lkasjdfh alskdjfh lsakjdfh lsakdjfh laskdjfh lasdkjfh lskajdfh lsakdjfh lsakdjfh laskdjfh laskdjf hlaskdjfh laskdjfh </span>
        </div>
        </div>
        <SongListItem />
      </div>
    )
}

export default UserProfile;