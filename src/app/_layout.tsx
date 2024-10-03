/** @format */
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";
import ThemeProvider from "@/src/theme";
import defaultTheme from "@/src/theme/default-theme";
import Layout from "@/src/components/layout";
import LayoutContext from "../context/layout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LayoutContext>
      <ThemeProvider theme={defaultTheme}>
        <Layout layoutOn={true}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='login' options={{ headerShown: false }} />
            <Stack.Screen name='signin' options={{ headerShown: false }} />
            <Stack.Screen name='dashboard' options={{ headerShown: false }} />
            <Stack.Screen name='scredule' options={{ headerShown: false }} />
            <Stack.Screen name='projects' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </Layout>
      </ThemeProvider>
    </LayoutContext>
  );
}
