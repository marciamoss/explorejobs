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
  const [layoutChange, setLayoutChange] = useState(false);
  let timerId = "";

  useEffect(() => {
    setLayoutChange(true);
    let timerId = setTimeout(() => {
      setLayoutChange(false);
    }, 5);
    return () => {
      clearTimeout(timerId);
    };
  }, [orientation]);

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      const o = info;
      setOrientation(
        o === 1 || o === 2 ? "portrait" : o === 3 || o === 4 ? "landscape" : ""
      );
    });
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        setLayoutChange(true);
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
        timerId = setTimeout(() => {
          setLayoutChange(false);
        }, 50);
      }
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
      clearTimeout(timerId);
    };
  }, []);

  return [screenWidth, screenHeight, orientation, layoutChange];
};

export default useGetOrientation;
