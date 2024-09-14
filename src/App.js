import React from 'react';
import {AppNavigator} from './routes/AppNavigator';
import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider, createTheme} from '@mui/material';

import theme from './theme/MaterialTheme';
import {Theme} from '@radix-ui/themes';

function App() {
  return (
    <>
      <ThemeProvider theme={createTheme(theme)}>
        <Theme>
          <BrowserRouter basename="/">
            <AppNavigator />
          </BrowserRouter>
        </Theme>
      </ThemeProvider>
    </>
  );
}

export default App;
