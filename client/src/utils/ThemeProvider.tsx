import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useLayoutEffect,
  useMemo,
} from "react";
import { createTheme, ThemeProvider as MThemeProvider } from "@mui/material";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };
  const materialTheme = useMemo(() => {
    const themeData = createTheme({
      palette: {
        // @ts-ignore
        mode: theme,
        chat: {
          primary: {
            main: "#5A4F7E",
          },
          secondary: {
            main: "#4C426A ",
          },
        },
        message: {
          primary: {
            main: "#E5AD8C",
          },
          secondary: {
            main: "#69C3B6",
          },
        },
      },
    });
    return themeData;
  }, [theme]);

  const getUserPreference = () => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const mode = darkModeMediaQuery.matches ? "dark" : "light";
    setTheme(mode);
  };

  useLayoutEffect(() => {
    getUserPreference();
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MThemeProvider theme={materialTheme}>{children}</MThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
