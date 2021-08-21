import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { KeyboardEventListener } from "react-native";
import { Keyboard } from "react-native";

type State = { inset: number; duration: number };
type Action = { type: "setKeyboardInset"; payload: { inset: number; duration: number } };

const KeyboardContext = createContext<State>({
  inset: 0,
  duration: 250,
});

function keyboardReducer(_: State, action: Action): State {
  switch (action.type) {
    case "setKeyboardInset":
      return {
        inset: action.payload.inset,
        duration: action.payload.duration,
      };
  }
}

export const KeyboardInsetProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(keyboardReducer, {
    inset: 0,
    duration: 250,
  });

  useEffect(() => {
    const onKeyboardWillShow: KeyboardEventListener = (event) => {
      const currentInset = state.inset;
      let inset = (event.startCoordinates?.screenY ?? 0) - event.endCoordinates.screenY;

      if (inset === 0) {
        // The keyboard is already showing, but the focus changed.
        return;
      }

      if (currentInset !== 0) {
        // Apply a relative inset, the keyboard height probably changed.
        inset = currentInset + inset;
      }

      dispatch({
        type: "setKeyboardInset",
        payload: {
          inset,
          duration: event.duration,
        },
      });
    };

    const onKeyboardWillHide: KeyboardEventListener = (event) => {
      dispatch({
        type: "setKeyboardInset",
        payload: {
          inset: 0,
          duration: event.duration,
        },
      });
    };

    Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
    Keyboard.addListener("keyboardWillHide", onKeyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", onKeyboardWillHide);
    };
  }, [state.inset]);

  return <KeyboardContext.Provider value={state}>{children}</KeyboardContext.Provider>;
};

export function useKeyboardInset() {
  const context = useContext(KeyboardContext);

  if (context === undefined) {
    throw new Error("useKeyboard must be used within a KeyboardProvider.");
  }

  return context;
}
