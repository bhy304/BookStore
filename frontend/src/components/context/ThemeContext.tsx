import { createContext, useState } from 'react';
import { getTheme, type ThemeName } from '../../style/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../style/global';

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

const defaultState = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(defaultState);

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'book_store_theme';

const getInitialTheme = (): ThemeName => {
  const savedThemeName = localStorage.getItem(
    THEME_LOCALSTORAGE_KEY
  ) as ThemeName;
  return savedThemeName || DEFAULT_THEME_NAME;
};

export const BookStoreThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme);

  const toggleTheme = () => {
    const newThemeName = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newThemeName);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, newThemeName);
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
