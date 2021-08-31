import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext.js';
import SignUp from './Authentication/SignUp.jsx';
import SignIn from './Authentication/SignIn.jsx';
import Home from './Home.jsx';

import Feed from './HomePage/Feed.jsx'
import Workstation from './Workstation/Workstation.jsx';
import Toolbar from './Toolbar.jsx';
import UserProfile from './UserProfile/UserProfile.jsx'
import Uploader from './Uploader.jsx';
import Viewer from './Viewer.jsx';

const initialState = {
  userId: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateUserId':
      return { ...state, userId: action.data}
    default:
      return state;
  }
};

export const GlobalContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <AuthProvider>
          {/* <h1>Blue Ocean</h1> */}
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </Router>
        </AuthProvider>
      </GlobalContext.Provider>
    </div>
    // <React.StrictMode>
    //   <Router>
    //       <Toolbar />
    //       <Switch>
    //         <Route exact path="/" component={Feed} />
    //         <Route path="/users" component={UserProfile} />
    //         <Route path="/create" component={Workstation} />

    //       </Switch>
    //   </Router>
    // </React.StrictMode>
  );
}

export default App;