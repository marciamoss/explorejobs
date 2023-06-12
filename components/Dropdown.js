import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useGetOrientation } from "../hooks";

const Dropdown = ({ list, setDropdownValue = () => {}, dropdownValue }) => {
  const [screenWidth, screenHeight, orientation, layoutChange] =
    useGetOrientation();
  if (layoutChange) {
    return (
      <View
        style={[
          styles.dropdownSection,
          {
            justifyContent: "center",
            height: 50,
            width: 100,
          },
        ]}
      >
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.dropdownSection,
        {
          marginLeft: 15,
          marginRight: 10,
          backgroundColor: "#009688",
          flexDirection: orientation === "landscape" ? "row" : "column",
        },
      ]}
    >
      <Text
        style={{
          color: "white",
          marginTop: 15,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: orientation === "landscape" ? 15 : 0,
          fontSize: 18,
          fontWeight: "bold",
          width: 70,
          textAlign: "center",
        }}
      >
        Max # of Jobs
      </Text>
      {list.length > 0 &&
        list.map((item, index) => (
          <Pressable
            style={{
              marginTop: orientation === "portrait" && index === 0 ? 5 : 0,
              marginBottom:
                orientation === "portrait" && index === list.length - 1
                  ? 15
                  : 0,
              marginRight:
                index === list.length - 1 && orientation === "landscape"
                  ? 15
                  : 0,
            }}
            onPress={() => {
              setDropdownValue(item);
            }}
            key={item}
          >
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,

                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: dropdownValue === item ? "white" : "#009688",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "900",
                  color: dropdownValue === item ? "#009688" : "white",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Text>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownSection: {
    position: "absolute",
    top: 130,
    right: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dropdown;
