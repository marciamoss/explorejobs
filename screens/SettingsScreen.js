import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

const SettingsScreen = ({ clearLikedJobs, navigation }) => {
  return (
    <View>
      <Button
        title="Reset Liked Jobs"
        icon={{ name: "delete-forever", color: "white", size: 35 }}
        titleStyle={{ fontSize: 24 }}
        buttonStyle={{ backgroundColor: "#F44336", height: 96 }}
        onPress={clearLikedJobs}
      />
    </View>
  );
};

export default SettingsScreen;
