import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Location from "../models/location";
import CreateNoteScreen from "../screens/CreateNoteScreen";
import MapScreen from "../screens/MapScreen";

export type MapStackParamList = {
  Map: undefined;
  CreateNote: { location: Location };
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
    </Stack.Navigator>
  );
};

export default MapStack;
