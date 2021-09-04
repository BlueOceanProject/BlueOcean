import React, { useContext, useState, useEffect } from 'react';
import './firebase';
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { GlobalContext } from '../App.jsx';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const globalData = useContext(GlobalContext);

  const auth = getAuth();
  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signout = () => signOut(auth);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
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
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
