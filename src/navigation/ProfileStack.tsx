import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useAuth } from "../context/AuthContext";
import MyNoteDetailScreen from "../screens/MyNoteDetailScreen";
import MyNotesScreen from "../screens/MyNotesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

export type ProfileStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Profile: undefined;
  MyNotes: undefined;
  MyNoteDetail: {
    id: string;
    content: string;
  };
  Statistics: undefined;
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
          <Stack.Screen name="MyNotes" component={MyNotesScreen} options={{ headerTitle: "My notes" }} />
          <Stack.Screen name="MyNoteDetail" component={MyNoteDetailScreen} options={{ headerTitle: "" }} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerTitle: "Statistics" }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProfileStack;
