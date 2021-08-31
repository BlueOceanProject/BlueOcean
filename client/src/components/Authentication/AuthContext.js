import React, { useContext, useState, useEffect } from 'react';
import app from './firebase.js';
import { GlobalContext } from '../App.jsx';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const globalData = useContext(GlobalContext);

  const auth = getAuth();
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  };

  useEffect(()=> {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // console.log(user.uid);
        globalData.dispatch({ type: 'updateUserId', data: user.uid });
      } else {
        globalData.dispatch({ type: 'updateUserId', data: '' });
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscriber;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};