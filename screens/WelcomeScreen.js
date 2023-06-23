import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slides from "../components/Slides";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const SLIDE_DATA = [
  {
    text: "Welcome to jobApp",
    color: "#03A9F4",
  },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location, then swipe away", color: "#03A9F4" },
];

const WelcomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem("exploreJobs_token");
      let token = await AsyncStorage.getItem("exploreJobs_token");
      if (token) {
        setToken(token);
      }
      setAppIsReady(true);
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      if (token) {
        navigation.navigate("Main", { screen: "Map" });
      } else {
        await SplashScreen.hideAsync();
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const onSlidesComplete = () => navigation.navigate("Auth");

  return (
    <View onLayout={onLayoutRootView}>
      {appIsReady && _.isNull(token) ? (
        <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
      ) : (
        ""
      )}
    </View>
  );
};
export default WelcomeScreen;
