import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "@/src/navigation/stackNavigator";

import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
        <Toast />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
