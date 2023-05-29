import React from "react";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { clearLikedJobs } from "../store";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View>
      <Button
        title="Reset Liked Jobs"
        icon={{ name: "delete-forever", color: "white", size: 35 }}
        titleStyle={{ fontSize: 24 }}
        buttonStyle={{ backgroundColor: "#F44336", height: 96 }}
        onPress={() => {
          dispatch(clearLikedJobs());
          navigation.navigate("Review");
        }}
      />
    </View>
  );
};

export default SettingsScreen;
