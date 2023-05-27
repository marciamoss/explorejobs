import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "../screens/AuthScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Main from "./Main";

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
        <Tab.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
        <Tab.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
