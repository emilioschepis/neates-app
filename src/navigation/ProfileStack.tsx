import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useAuth } from "../context/AuthContext";
import MyNotesScreen from "../screens/MyNotesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type ProfileStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
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
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
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
