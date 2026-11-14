import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";
import { TodosProvider } from "@/context/TodosContext";
import { useTheme } from "@/hooks/useTheme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodosProvider>
          <AppStack />
        </TodosProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppStack() {
  const { colorScheme, theme } = useTheme();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: "Edit Todo" }} />
      </Stack>
    </>
  );
}
