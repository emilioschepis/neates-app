import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useAuth } from "../context/AuthContext";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  const { isAnonymous } = useAuth();

  return (
    <Stack.Navigator>
      {isAnonymous ? (
        <>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProfileStack;
