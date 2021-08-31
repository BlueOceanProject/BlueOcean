import React, { useState, useEffect } from 'react';
import { AuthProvider } from './Authentication/AuthContext.js';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import SignUp from './Authentication/SignUp.jsx';

const App = () => {

  return (
    <div>
      <AuthProvider>
        {/* <h1>Blue Ocean</h1> */}
        <SignUp />
      </AuthProvider>
    </div>
  );
}

export default App;