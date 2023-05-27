import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import SettingsScreen from "../screens/SettingsScreen";
import ReviewScreen from "../screens/ReviewScreen";

const Review = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          title: "Review Jobs",
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <Button
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
                type="clear"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerTitleAlign: "center",
          headerBackTitle: "Review",
          headerBackTitleVisible: true,
        }}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};
export default Review;
