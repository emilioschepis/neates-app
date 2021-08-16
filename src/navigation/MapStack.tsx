import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CreateNoteScreen from "../screens/CreateNoteScreen";
import MapScreen from "../screens/MapScreen";

export type MapStackParamList = {
  Map: undefined;
  CreateNote: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} options={{ headerTitle: "New note" }} />
    </Stack.Navigator>
  );
};

export default MapStack;
