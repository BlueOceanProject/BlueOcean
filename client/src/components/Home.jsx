import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Feed from './HomePage/Feed.jsx';
import Workstation from './Workstation/Workstation.jsx';
import Toolbar from './Toolbar.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';

const Home = () => (
  <>
    <Toolbar />
    <Switch>
      <Route path="/feed" component={Feed} />
      <Route path="/user" component={UserProfile} />
      <Route path="/create" component={Workstation} />
      <Redirect to="/feed" />
    </Switch>
  </>
);

export default Home;
