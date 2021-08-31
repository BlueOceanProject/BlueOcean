import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import UserProfile from './UserProfile/UserProfile.jsx'
import Import from './Workstation/Import.jsx';

const App = () => {

  return (
    <div>
      <h1>Blue Ocean</h1>
      <Feed />
      <Workstation />
    </div>
  );
}

export default App;