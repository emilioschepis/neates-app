import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useAuth } from "../context/AuthContext";
import MyNotesScreen from "../screens/MyNotesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type ProfileStackParamList = {
  SignUp: undefined;
  Profile: undefined;
  MyNotes: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

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
          <Stack.Screen name="MyNotes" component={MyNotesScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProfileStack;
