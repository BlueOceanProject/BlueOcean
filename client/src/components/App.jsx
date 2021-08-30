import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';


const App = () => {

  return (
    <div>
      <h1>Blue Ocean</h1>
      <UserProfile />
    </div>
  );
}

export default App;