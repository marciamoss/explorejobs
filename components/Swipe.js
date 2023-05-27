import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  data,
  renderCard,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards,
  keyProp = "id",
  setCardMove,
}) => {
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
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };
  const onSwipeComplete = (direction) => {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
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
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };
  const renderCards = (data) => {
    if (index >= data.length) {
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
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            {renderCard(item, dataIndex, data.length, true)}
          </Animated.View>
        );
      }
      return (
        <Animated.View key={item[keyProp]} style={styles.cardStyle}>
          {renderCard(item, dataIndex, data.length, false)}
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
    width: SCREEN_WIDTH,
  },
};

export default Swipe;
