import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Colors, Theme } from "@/constants/Colors";
import { STORAGE_KEYS } from "@/constants/Storage";

export type ColorScheme = "light" | "dark";

type ThemeContextValue = {
  colorScheme: ColorScheme;
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.theme)
      .then((saved) => {
        if (saved === "light" || saved === "dark") setColorScheme(saved);
      })
      .catch(console.error);
  }, []);

  const toggleTheme = () => {
    const next: ColorScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(next);
    AsyncStorage.setItem(STORAGE_KEYS.theme, next).catch(console.error);
  };

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
