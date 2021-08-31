import React, { useContext, useState, useEffect } from 'react';
import app from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const auth = getAuth();
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(()=> {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};