import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext.js';
import SignUp from './Authentication/SignUp.jsx';
import SignIn from './Authentication/SignIn.jsx';
import Home from './Home.jsx';

const initialState = {
  userId: '',
  query: '',
  username: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateUserId':
      return { ...state, userId: action.data}
    case 'updateQuery':
      return { ...state, query: action.data}
    case 'updateUsername':
      return { ...state, username: action.data}
    default:
      return state;
  }
};

export const GlobalContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.userId) {
      axios.get(`/username/${state.userId}`)
        .then((res) => {
          dispatch({ type: 'updateUsername', data: res });
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      dispatch({ type: 'updateUsername', data: '' });
    }
  }, [state.userId]);

  return (
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
  );
}

export default App;