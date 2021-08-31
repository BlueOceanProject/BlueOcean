import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext.js';
import SignUp from './Authentication/SignUp.jsx';
import SignIn from './Authentication/SignIn.jsx';
import Home from './Home.jsx';

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
<<<<<<< HEAD
    <Router>
      <div>
        <Workstation />
        <Toolbar />
        <Switch>
          <Route path="/">
            <h1>Blue Ocean</h1>
            <Feed />
          </Route>
        </Switch>
      </div>
    </Router>
=======
    <div>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </AuthProvider>
      </GlobalContext.Provider>
    </div>
>>>>>>> main
  );
}

export default App;