import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useGetOrientation } from "../hooks";

const Slides = ({ data, onComplete }) => {
  const scrollRef = useRef();
  const [screenWidth, screenHeight, orientation] = useGetOrientation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [oSet, setOSet] = useState(0);
  const [iSet, setISet] = useState({ bottom: 0, left: 0, right: 0, top: 0 });

  useEffect(() => {
    setOSet(screenWidth * currentSlide);
    if (scrollRef.current && Platform.OS === "android") {
      scrollRef.current.scrollTo({
        x: screenWidth * currentSlide,
        y: 0,
        animated: true,
      });
    }
  }, [screenWidth]);

  useEffect(() => {
    setISet({ bottom: 0, left: 0, right: 0, top: 0 });
  }, [oSet]);

  const renderLastSlide = (index) => {
    if (index === data.length - 1) {
      return (
        <Button
          title="Onwards!"
          raised={true}
          buttonStyle={styles.buttonStyle}
          onPress={onComplete}
        />
      );
    }
  };
  const renderSlides = () => {
    return data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[
            styles.slideStyle,
            { backgroundColor: slide.color, width: screenWidth },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              { marginBottom: index === data.length - 1 ? 15 : 0 },
            ]}
          >
            {slide.text}
          </Text>
          {renderLastSlide(index)}
        </View>
      );
    });
  };
  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      contentInset={iSet}
      contentOffset={{ x: oSet, y: 0 }}
      onMomentumScrollEnd={(event) =>
        setCurrentSlide(event.nativeEvent.contentOffset.x / screenWidth)
      }
      contentContainerStyle={{ height: screenHeight }}
    >
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "white",
    padding: 4,
    textAlign: "center",
  },
  scrollView: {},
  buttonStyle: {
    backgroundColor: "#0288d1",
  },
});

export default Slides;
