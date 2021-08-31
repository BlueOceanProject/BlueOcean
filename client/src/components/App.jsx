import React, { useState, useEffect } from 'react';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Viewer from './Viewer.jsx';
import Toolbar from './Toolbar.jsx';
import {BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile.jsx'
import Import from './Workstation/Import.jsx';

const App = () => {

  return (
    <Router>
      <div>
        <Toolbar />
        <Switch>
          <Route path="/">
            <h1>Blue Ocean</h1>
            <UserProfile />
            <Feed />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;