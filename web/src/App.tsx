import React from 'react';
import Routes from './routes';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import usePersisedState from './utils/usePersistedState';
import { AuthProvider } from './context/auth';
import GlobalStyles from './styles/global';
import ThemeContext from './context/theme';
import light from './styles/theme/light';
import dark from './styles/theme/dark';

function App() {
  const [theme, setTheme] = usePersisedState<DefaultTheme>('theme', light);
  function toggleTheme() {
    setTheme(theme.name === 'light' ? dark : light);
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
