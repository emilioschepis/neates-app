import React, { useEffect, useReducer, createContext, useContext } from "react";

import firebase from "../firebase/firebase";
import User from "../models/user";
import { waitForClaims } from "../utils/authUtils";

type State =
  | { loading: true; user: null; isAnonymous: null }
  | { loading: false; user: User; isAnonymous: boolean };
type Action = { type: "setAuthenticated"; user: User };

const AuthContext = createContext<State>({
  loading: true,
  user: null,
  isAnonymous: null,
});

function authReducer(_: State, action: Action): State {
  switch (action.type) {
    case "setAuthenticated":
      return {
        loading: false,
        user: action.user,
        isAnonymous: action.user.isAnonymous,
      };
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    user: null,
    isAnonymous: null,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user === null) {
        return firebase.auth().signInAnonymously();
      }

      await waitForClaims(user);

      dispatch({
        type: "setAuthenticated",
        user: new User(user.uid, user.email ?? null, user.isAnonymous),
      });
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
