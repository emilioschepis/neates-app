import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import MapStack from "./MapStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{
          headerShown: false,
          tabBarLabel: "Map",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "map" : "map-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
