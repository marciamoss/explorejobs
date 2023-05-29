import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import MapScreen from "../screens/MapScreen";
import DeckScreen from "../screens/DeckScreen";
import Review from "./Review";

const Main = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const { likedJobs } = useSelector((state) => state.likedJobs);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="my-location" size={30}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Deck"
        component={DeckScreen}
        listeners={{
          tabPress: (e) => (jobs.length === 0 ? e.preventDefault() : ""),
        }}
        options={{
          headerShown: false,
          title: "Jobs",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="description" size={30}></Icon>
          ),
        }}
      />

      <Tab.Screen
        name="Review Jobs"
        component={Review}
        listeners={{
          tabPress: (e) => (likedJobs.length === 0 ? e.preventDefault() : ""),
        }}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="favorite" size={30}></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
