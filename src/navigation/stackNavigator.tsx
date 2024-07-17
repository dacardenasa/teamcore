import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Finish, Survey } from "../screens";
import { CustomHeader } from "../components";

export type StackNavigatorParams = {
    Home: undefined;
    Finish: undefined;
  };

const Stack = createStackNavigator<StackNavigatorParams>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleAlign: "center",
        headerTitle: CustomHeader,
        headerLeft: () => null
      }}
    >
      <Stack.Screen name="Home" component={Survey} />
      <Stack.Screen
        name="Finish"
        component={Finish}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F9"
  }
});
