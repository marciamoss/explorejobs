import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Text,
} from "react-native";
import { useGetOrientation } from "../hooks";

const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  data,
  renderCard,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards,
  keyProp = "id",
  setCardMove,
  setSwipeCompleted,
  lastCard,
}) => {
  const [screenWidth, screenHeight, orientation, layoutChange, swipeThreshold] =
    useGetOrientation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [data]);

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
    const item = data[index];
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

  const renderCards = (data) => {
    if (lastCard) {
      return renderNoMoreCards();
    }
    const deck = data.map((item, dataIndex) => {
      if (dataIndex < index) {
        return null;
      }
      if (dataIndex === index) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[getCardStyle(), styles.cardStyle, { width: screenWidth }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item, true)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[keyProp]}
          style={[styles.cardStyle, , { width: screenWidth }]}
        >
          {renderCard(item, false)}
        </Animated.View>
      );
    });
    return deck.reverse();
  };
  return <View>{renderCards(data)}</View>;
};

const styles = {
  cardStyle: {
    position: "absolute",
  },
};

export default Swipe;
