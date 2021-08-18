import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useOptionalAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const MainStack = () => {
  const auth = useOptionalAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.loading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
