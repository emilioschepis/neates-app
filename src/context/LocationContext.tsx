import * as ExpoLocation from "expo-location";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import Location from "../models/location";
import { LocationConstants } from "../utils/constants";

type State = { loading: boolean; granted: boolean; location: Location };
type Action =
  | {
      type: "setNotGranted";
    }
  | {
      type: "setGranted";
      payload: { location: Location | null };
    }
  | {
      type: "updateLocation";
      payload: { location: Location };
    };

const LocationContext = createContext<State>({
  loading: true,
  granted: false,
  location: new Location(0, 0),
});

function locationReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setNotGranted":
      return {
        ...state,
        loading: false,
        granted: false,
      };
    case "setGranted":
      return {
        loading: false,
        granted: true,
        location: action.payload.location ?? state.location,
      };
    case "updateLocation":
      return {
        ...state,
        location: action.payload.location,
      };
  }
}

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(locationReducer, {
    loading: true,
    granted: false,
    location: new Location(0, 0),
  });

  useEffect(() => {
    let cleanUp = () => {};

    async function checkPermissions(): Promise<boolean> {
      const current = await ExpoLocation.getForegroundPermissionsAsync();

      if (current.granted) {
        return true;
      }

      if (!current.canAskAgain) {
        return false;
      }

      const requested = await ExpoLocation.requestForegroundPermissionsAsync();

      return requested.granted;
    }

    function onLocationChange(update: ExpoLocation.LocationObject) {
      const location = new Location(update.coords.latitude, update.coords.longitude);

      dispatch({
        type: "updateLocation",
        payload: { location },
      });
    }

    checkPermissions().then((granted) => {
      if (!granted) {
        dispatch({
          type: "setNotGranted",
        });
        return;
      }

      dispatch({
        type: "setGranted",
        payload: { location: null },
      });

      ExpoLocation.watchPositionAsync(
        {
          distanceInterval: LocationConstants.minimumRefetchDistance,
          timeInterval: LocationConstants.minimumRefetchTime,
        },
        onLocationChange
      ).then(({ remove }) => {
        cleanUp = remove;
      });
    });

    return () => cleanUp();
  }, []);

  return <LocationContext.Provider value={state}>{children}</LocationContext.Provider>;
};

export function useLocation() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider.");
  }

  return context;
}
