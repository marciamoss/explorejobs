import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useGetOrientation } from "../hooks";

const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  renderCard,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  keyProp = "id",
  setCardMove,
  setSwipeCompleted,
  currentJob,
  nextJob,
}) => {
  const [swipeThreshold, setSwipeThreshold] = useState(null);
  const [screenWidth] = useGetOrientation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (screenWidth) {
      setSwipeThreshold(0.25 * screenWidth);
    }
  }, [screenWidth]);

  useEffect(() => {
    setIndex(0);
  }, [currentJob]);

  useLayoutEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  const position = new Animated.ValueXY();

  position.addListener(({ x, y }) => {
    setCardMove(true);
    if (x === 0 && y === 0) {
      setCardMove(false);
    }
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > swipeThreshold) {
        forceSwipe("right");
      } else if (gesture.dx < -swipeThreshold) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });

  const forceSwipe = (direction) => {
    const x = direction === "right" ? screenWidth : -screenWidth;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };
  const onSwipeComplete = (direction) => {
    const item = currentJob;

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setSwipeCompleted(true);
    setIndex(index + 1);
    position.setValue({ x: 0, y: 0 });
  };
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-screenWidth * 2.0, 0, screenWidth * 2.0],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = (currentJob, nextJob) => {
    return (
      <>
        <Animated.View
          key={currentJob[keyProp]}
          style={[
            getCardStyle(),
            styles.cardStyle,
            { width: screenWidth, zIndex: 99 },
          ]}
          {...panResponder.panHandlers}
        >
          {renderCard(currentJob, true)}
        </Animated.View>
        {nextJob ? (
          <Animated.View
            key={nextJob[keyProp]}
            style={[styles.cardStyle, { width: screenWidth, zIndex: -1 }]}
          >
            {renderCard(nextJob, false)}
          </Animated.View>
        ) : (
          ""
        )}
      </>
    );
  };
  return <View>{renderCards(currentJob, nextJob)}</View>;
};

const styles = {
  cardStyle: {
    position: "absolute",
  },
};

export default Swipe;
