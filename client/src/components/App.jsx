import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Toolbar from './Toolbar.jsx';
import UserProfile from './UserProfile/UserProfile.jsx'
import Uploader from './Uploader.jsx';
import Viewer from './Viewer.jsx';

const App = () => {

  return (
    <React.StrictMode>
      <Router>
          <Toolbar />
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/users" component={UserProfile} />
            <Route path="/create" component={Workstation} />

          </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;