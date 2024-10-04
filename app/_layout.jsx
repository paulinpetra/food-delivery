import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Inter_18pt-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")}
              //style={{
              //  width: 55,
              //  height: 54,
              //  }}
              resizeMode="contain"
            />
          ),
          headerTitle: "", // Hiding the default title to only show the logo
          headerShadowVisible: false,
          headerTintColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <Stack.Screen
        name="[restaurantId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 54,
    height: 54,
  },
});
