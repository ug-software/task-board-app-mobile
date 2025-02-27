/** @format */
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";
import ThemeProvider from "@/src/theme";
import defaultTheme from "@/src/theme/default-theme";
import Layout from "@/src/components/layout";
import LayoutContext from "../context/layout";
import SnackContext from "../context/snack";
import LoaderContext from "../context/loading";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import DialogContext from "../context/dialog";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const DB_NAME = "database.db";
const expoDb = openDatabaseSync(DB_NAME);
const db = drizzle(expoDb);

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
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

  /*if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }*/

  /*if (!success) {
    return <ActivityIndicator />;
  }*/

  return (
    <SQLiteProvider databaseName={DB_NAME}>
      <ThemeProvider theme={defaultTheme}>
        <LoaderContext>
          <DialogContext>
            <SnackContext>
              <LayoutContext>
                <Layout>
                  <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='login' options={{ headerShown: false }} />
                    <Stack.Screen name='signin' options={{ headerShown: false }} />
                    <Stack.Screen name='dashboard' options={{ headerShown: false }} />
                    <Stack.Screen name='schedule' options={{ headerShown: false }} />
                    <Stack.Screen name='projects' options={{ headerShown: false }} />
                    <Stack.Screen name='setting' options={{ headerShown: false }} />
                    <Stack.Screen name='profile' options={{ headerShown: false }} />
                    <Stack.Screen name='+not-found' />
                  </Stack>
                </Layout>
              </LayoutContext>
            </SnackContext>
          </DialogContext>
        </LoaderContext>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
