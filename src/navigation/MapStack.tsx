import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import MapScreen from "../screens/MapScreen";

export type MapStackParamList = {
  Map: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MapStack;
