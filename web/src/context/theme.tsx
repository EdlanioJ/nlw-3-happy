import React, { createContext, useContext } from 'react';

import light from '../styles/theme/light';
import dark from '../styles/theme/dark';
import usePersisedState from '../utils/usePersistedState';
import { DefaultTheme } from 'styled-components';

interface ThemeContextData {
  toggleTheme(): void;
}
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const Theme: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersisedState<DefaultTheme>('theme', light);
  function toggleTheme() {
    setTheme(theme.name === 'light' ? dark : light);
  }
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}

export default ThemeContext;
