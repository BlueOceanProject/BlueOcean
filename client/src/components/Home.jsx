import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Toolbar from './Toolbar.jsx';
import UserProfile from './UserProfile/UserProfile.jsx'
import Uploader from './Uploader.jsx';
import Viewer from './Viewer.jsx';

const Home = () => (
  <>
    <Toolbar />
    <Switch>
      <Route path="/feed" component={Feed} />
      <Route path="/users" component={UserProfile} />
      <Route path="/create" component={Workstation} />
      <Redirect to="/feed" />
    </Switch>
  </>
);

export default Home;