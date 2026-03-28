import { ThemeProvider as BaseThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <BaseThemeProvider attribute="class" forcedTheme="light" enableSystem>
      {children}
    </BaseThemeProvider>
  );
};

export { ThemeProvider };
