import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const useGetOrientation = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      const o = info;
      setOrientation(
        o === 1 || o === 2 ? "portrait" : o === 3 || o === 4 ? "landscape" : ""
      );
    });
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        const o = evt.orientationInfo.orientation;
        setOrientation(
          o === 1 || o === 2
            ? "portrait"
            : o === 3 || o === 4
            ? "landscape"
            : ""
        );
        setScreenWidth(Dimensions.get("window").width);
        setScreenHeight(Dimensions.get("window").height);
      }
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return [screenWidth, screenHeight, orientation];
};

export default useGetOrientation;
